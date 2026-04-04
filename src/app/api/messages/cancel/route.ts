import { convex } from "@/lib/convex-client";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

const requestSchema = z.object({
  projectId: z.string(),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { projectId } = requestSchema.parse(body);

  const internalKey = process.env.CONVEX_INTERNAL_KEY;
  if (!internalKey) {
    return new Response("Internal Server Error", { status: 500 });
  }

  //Find all processing messages for the project and update their status to cancelled
  try {
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
        return message._id;
      }),
    );
    return NextResponse.json({
      success: true,
      messageIds: cancelledIds,
      message: "Messages cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      cancelled: false,
      message: "Failed to cancel messages",
    });
  }
}
