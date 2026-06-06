"use client";

import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-edior";
import { usePendingChanges } from "@/features/projects/hooks/use-file-changes";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { GitCompareArrowsIcon } from "lucide-react";

interface DiffChangesetIndicatorProps {
  projectId: Id<"projects">;
}

const DiffChangesetIndicator = ({ projectId }: DiffChangesetIndicatorProps) => {
  const pendingChanges = usePendingChanges(projectId);
  const { diffReview, openDiffReview, updateTotalChanges } = useEditor(projectId);

  const changeCount = pendingChanges?.length ?? 0;
  const prevCountRef = useRef(changeCount);

  // Only sync totalChanges when the count actually changes (avoids loop)
  useEffect(() => {
    if (changeCount > 0 && changeCount !== prevCountRef.current) {
      prevCountRef.current = changeCount;
      updateTotalChanges(changeCount);
    }
  }, [changeCount, updateTotalChanges]);

  if (changeCount === 0) return null;

  const handleClick = () => {
    if (diffReview.isOpen) return;
    openDiffReview(changeCount);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1.5 h-8.75 px-3 text-xs font-medium transition-colors",
        "border-y border-x border-transparent",
        diffReview.isOpen
          ? "bg-amber-500/10 text-amber-400 border-b-amber-500"
          : "text-amber-400/80 hover:bg-amber-500/10 hover:text-amber-400",
      )}
    >
      <GitCompareArrowsIcon className="size-3.5" />
      <span className="tabular-nums">{changeCount}</span>
      <span className="hidden sm:inline">
        {changeCount === 1 ? "change" : "changes"}
      </span>
    </button>
  );
};

export default DiffChangesetIndicator;
