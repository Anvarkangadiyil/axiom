import React, { FormEvent } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageContent,
  MessageAction,
  MessageActions,
  MessageResponse,
} from "@/components/ai-elements/message";

import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { DEFAULT_CONVERSATION_TITLE } from "../constants";
import { Button } from "@/components/ui/button";
import { CopyIcon, HistoryIcon, LoaderIcon, PlusIcon } from "lucide-react";
import {
  useConversation,
  useConversations,
  useCreateConversation,
  useMessages,
} from "../hooks/use-conversations";
import { toast } from "sonner";
import ky from "ky";
import { PastConversationDialog } from "./past-conversation-dialog";

interface ConversationSidebarProps {
  projectId: Id<"projects">;
}

const ConversationSidebar = ({ projectId }: ConversationSidebarProps) => {
  const [input, setInput] = React.useState<string>("");
  const [selectedConversationId, setSelectedConversationId] =
    React.useState<Id<"conversations"> | null>(null);

  const[pastConversationOpen, setPastConversationOpen] = React.useState(false); 

  const createConversation = useCreateConversation();
  const conversations = useConversations(projectId);

  const activeConversationId =
    selectedConversationId ?? conversations?.[0]?._id ?? null;

  const activeConversation = useConversation(activeConversationId);

  const conversationMessages = useMessages(activeConversationId);

  const isProcessing = conversationMessages?.some(
    (message) => message.status === "processing",
  );

  const handleCreateConversation = async () => {
    try {
      const conversationId = await createConversation({
        projectId,
        title: DEFAULT_CONVERSATION_TITLE,
      });

      setSelectedConversationId(conversationId);

      return conversationId;
    } catch (error) {
      toast.error("Failed to create conversation");
      return null;
    }
  };

  async function handleSubmit(message: PromptInputMessage) {
    // if processing no new message just stop function
    if (isProcessing && !message.text) {
      handleCancel();
      setInput("");

      return;
    }

    let conversationId = activeConversationId;
    if (!conversationId) {
      conversationId = await handleCreateConversation();
      if (!conversationId) {
        return;
      }
    }

    //Trigger Inngesr function via API

    try {
      await ky.post("/api/messages", {
        json: {
          conversationId,
          message: message.text,
        },
      });
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }

    setInput("");
  }


  const handleCancel = async () => {
    try {
      await ky.post("/api/messages/cancel", {
        json: {
          projectId,
        },
      });
    } catch (error) {
      toast.error("Failed to cancel message");
      console.error(error);
    }
  };

  return (
    <>
    <PastConversationDialog
      projectId={projectId}
      open={pastConversationOpen}
      onOpenChange={setPastConversationOpen}
      onSelect={setSelectedConversationId}
    />
    <div className="flex flex-col h-full bg-sidebar">
      <div className="h-8.75 flex items-center justify-between border-b">
        <div className="text-sm truncate pl-3">
          {activeConversation?.title ?? DEFAULT_CONVERSATION_TITLE}
        </div>
        <div className="flex items-center px-1 gap-1">
          <Button size="icon-sm" variant={"highlight"}
          onClick={() => setPastConversationOpen(true)}
          >
            <HistoryIcon className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            variant={"highlight"}
            onClick={handleCreateConversation}
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>
      </div>
      <Conversation className="flex-1">
        <ConversationContent>
          {conversationMessages?.map((message, messageIndex) => (
            <Message key={message._id} from={message.role}>
              <MessageContent>
                {message.status === "processing" ? (
                  <div className="flex items-center gap-2">
                    <LoaderIcon className="size-4 animate-spin" />
                    <span>Thinking....</span>
                  </div>
                ) : (
                  <MessageResponse>{message.content}</MessageResponse>
                )}
              </MessageContent>
              {message.role === "assistant" &&
                message.status === "complete" &&
                messageIndex === conversationMessages.length - 1 && (
                  <MessageActions>
                    <MessageAction
                      onClick={() => {
                        navigator.clipboard.writeText(message.content);
                        toast.success("Response copied to clipboard");
                      }}
                    >
                      <CopyIcon className="size-3" />
                    </MessageAction>
                  </MessageActions>
                )}
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="p-3">
        <PromptInput onSubmit={handleSubmit} className="mt-2 rounded-full!">
          <PromptInputBody>
            <PromptInputTextarea
              placeholder="Ask Axiom anything"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              disabled={isProcessing}
            ></PromptInputTextarea>
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit
              disabled={isProcessing ? false : !input.trim()}
              status={isProcessing ? "streaming" : undefined}
              onClick={() => {}}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
    </>
  );
};

export default ConversationSidebar;
