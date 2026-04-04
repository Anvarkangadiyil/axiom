"use client";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Id } from "../../../../convex/_generated/dataModel";
import { useConversations } from "../hooks/use-conversations";
import { CommandEmpty } from "cmdk";
import { formatDistanceToNow } from "date-fns";

interface PastConversationDialogProps {
  projectId: Id<"projects">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (conversationId: Id<"conversations">) => void;
}

export const PastConversationDialog = ({
  projectId,
  open,
  onOpenChange,
  onSelect,
}: PastConversationDialogProps) => {
  const conversations = useConversations(projectId);

  const handleSelect = (converstionId: Id<"conversations">) => {
    onSelect(converstionId);
    onOpenChange(false);
  };

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Past Conversations"
        description="Select a past conversation to view its details."
      >
        <CommandInput placeholder="Search conversations..." />
        <CommandList>
          <CommandEmpty>No conversations found.</CommandEmpty>
          <CommandGroup heading="Conversations">
            {conversations?.map((conversation) => (
              <CommandItem
                key={conversation._id}
                value={`${conversation.title}-${conversation._id}`}
                onSelect={() => handleSelect(conversation._id)}
              >
                <div className="flex flex-col gap-0.5">
                  <span>{conversation.title || "Untitled Conversation"}</span>
                  {formatDistanceToNow(conversation._creationTime, {
                    addSuffix: true,
                  })}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
