import { convex } from "@/lib/convex-client";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { inngest } from "@/inngest/client";

const requestSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string(),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const internalKey = process.env.CONVEX_INTERNAL_KEY;

  if (!internalKey) {
    return new Response("Internal Server Error", { status: 500 });
  }

  const body = await req.json();
  const { conversationId, message } = requestSchema.parse(body);

  //Convex Mutatation,query

  const conversation = await convex.query(api.system.getConversationById, {
    conversationId: conversationId as Id<"conversations">,
    internalKey,
  });

  if (!conversation) {
    return new Response("Conversation not found", { status: 404 });
  }

  const projectId = conversation.projectId;

  const processingMessages = await convex.query(
    api.system.getProcessingMessages,
    {
      internalKey,
      projectId: projectId as Id<"projects">,
    },
  );

  if (processingMessages.length > 0) {
    //Cancel all processing messagess
    const processingMessages = await convex.query(
      api.system.getProcessingMessages,
      {
        internalKey,
        projectId: projectId as Id<"projects">,
      },
    );

    if (processingMessages.length === 0) {
      return new Response("No processing messages found", { status: 404 });
    }

    //Cancel all processing messagess
    const cancelledIds = await Promise.all(
      processingMessages.map(async (message) => {
        await inngest.send({
          name: "message/cancel",
          data: {
            messageId: message._id,
            conversationId: message.conversationId,
            projectId: message.projectId,
          },
        });

        await convex.mutation(api.system.updateMessageStatus, {
          internalKey,
          messageId: message._id,
          status: "cancelled",
        });
      }),
    );
  }

  //TODO:check got for processing messages
  await convex.mutation(api.system.createMessage, {
    internalKey,
    conversationId: conversationId as Id<"conversations">,
    projectId,
    role: "user",
    content: message,
    status: "complete",
  });

  const assistantMessageId = await convex.mutation(api.system.createMessage, {
    internalKey,
    conversationId: conversationId as Id<"conversations">,
    projectId,
    role: "assistant",
    content: "",
    status: "processing",
  });

  const event = await inngest.send({
    name: "message/sent",
    data: {
      messageId: assistantMessageId,
      conversationId: conversationId as Id<"conversations">,
      projectId,
      message,

    },
  });

  return NextResponse.json({
    success: true,
    eventId: 0,
    messageId: assistantMessageId,
  });
}
