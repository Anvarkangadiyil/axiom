"use client";

import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-edior";
import {
  useAcceptChange,
  useRejectChange,
  useAcceptAllChanges,
  useRejectAllChanges,
} from "@/features/projects/hooks/use-file-changes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCheckIcon,
  XCircleIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileChange {
  _id: Id<"fileChanges">;
  changesetId: string;
  fileName: string;
  operation: "update" | "create" | "delete" | "rename";
  newName?: string;
  status: "pending" | "accepted" | "rejected";
}

interface DiffReviewBarProps {
  projectId: Id<"projects">;
  changes: FileChange[];
}

const DiffReviewBar = ({ projectId, changes }: DiffReviewBarProps) => {
  const {
    diffReview,
    navigateChange,
    closeDiffReview,
    setCurrentChangeIndex,
  } = useEditor(projectId);

  const acceptChange = useAcceptChange();
  const rejectChange = useRejectChange();
  const acceptAll = useAcceptAllChanges();
  const rejectAll = useRejectAllChanges();

  const currentIndex = diffReview.currentChangeIndex;
  const currentChange = changes[currentIndex];

  if (!currentChange || !diffReview.isOpen) return null;

  const pendingCount = changes.filter((c) => c.status === "pending").length;
  const changesetId = currentChange.changesetId;

  const handleAccept = async () => {
    await acceptChange({ changeId: currentChange._id });
    // Auto-navigate to next pending change
    const nextPending = changes.findIndex(
      (c, i) => i > currentIndex && c.status === "pending" && c._id !== currentChange._id
    );
    if (nextPending !== -1) {
      setCurrentChangeIndex(nextPending);
    }
  };

  const handleReject = async () => {
    await rejectChange({ changeId: currentChange._id });
    const nextPending = changes.findIndex(
      (c, i) => i > currentIndex && c.status === "pending" && c._id !== currentChange._id
    );
    if (nextPending !== -1) {
      setCurrentChangeIndex(nextPending);
    }
  };

  const handleAcceptAll = async () => {
    await acceptAll({ changesetId });
    closeDiffReview();
  };

  const handleRejectAll = async () => {
    await rejectAll({ changesetId });
    closeDiffReview();
  };

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-sidebar border-b border-border gap-2">
      {/* Left: Navigation */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => navigateChange("prev")}
              disabled={currentIndex <= 0}
            >
              <ChevronLeftIcon className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous change</TooltipContent>
        </Tooltip>

        <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
          <span className="text-foreground font-medium">{currentIndex + 1}</span>
          {" / "}
          <span>{changes.length}</span>
          <span className="ml-1.5 text-muted-foreground">
            ({pendingCount} pending)
          </span>
        </span>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => navigateChange("next")}
              disabled={currentIndex >= changes.length - 1}
            >
              <ChevronRightIcon className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next change</TooltipContent>
        </Tooltip>
      </div>

      {/* Center: Current file info */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={cn(
            "text-xs px-1.5 py-0.5 rounded font-medium shrink-0",
            currentChange.operation === "update" && "bg-amber-500/15 text-amber-400",
            currentChange.operation === "create" && "bg-emerald-500/15 text-emerald-400",
            currentChange.operation === "delete" && "bg-red-500/15 text-red-400",
            currentChange.operation === "rename" && "bg-blue-500/15 text-blue-400",
          )}
        >
          {currentChange.operation === "update" && "M"}
          {currentChange.operation === "create" && "A"}
          {currentChange.operation === "delete" && "D"}
          {currentChange.operation === "rename" && "R"}
        </span>
        <span className="text-xs text-foreground truncate">
          {currentChange.fileName}
          {currentChange.operation === "rename" && currentChange.newName && (
            <span className="text-muted-foreground">
              {" → "}
              {currentChange.newName}
            </span>
          )}
        </span>
        {currentChange.status !== "pending" && (
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded font-medium",
              currentChange.status === "accepted" && "bg-emerald-500/15 text-emerald-400",
              currentChange.status === "rejected" && "bg-red-500/15 text-red-400",
            )}
          >
            {currentChange.status}
          </span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {currentChange.status === "pending" && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={handleReject}
                >
                  <XIcon className="size-3" />
                  Reject
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject this change</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                  onClick={handleAccept}
                >
                  <CheckIcon className="size-3" />
                  Accept
                </Button>
              </TooltipTrigger>
              <TooltipContent>Accept this change</TooltipContent>
            </Tooltip>
          </>
        )}

        <div className="w-px h-4 bg-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleRejectAll}
              disabled={pendingCount === 0}
            >
              <XCircleIcon className="size-3" />
              Reject All
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reject all pending changes</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
              onClick={handleAcceptAll}
              disabled={pendingCount === 0}
            >
              <CheckCheckIcon className="size-3" />
              Accept All
            </Button>
          </TooltipTrigger>
          <TooltipContent>Accept all pending changes</TooltipContent>
        </Tooltip>

        <div className="w-px h-4 bg-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => closeDiffReview()}
            >
              <XIcon className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Close review</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default DiffReviewBar;
