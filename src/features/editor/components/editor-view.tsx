import React, { useEffect, useRef } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import TopNavigation from "./top-navigation";
import { useEditor } from "../hooks/use-edior";
import FileBreadCrumbs from "./file-breadcrumbs";
import { useFile, useUpdateFile } from "@/features/projects/hooks/use-file";
import { usePendingChanges } from "@/features/projects/hooks/use-file-changes";
import Image from "next/image";
import CodeEditor from "./code-editor";
import BinaryFileView from "./binary-file-view";
import DiffViewer from "./diff-viewer";
import DiffReviewBar from "./diff-review-bar";

const DEBOUNCE_TIME = 1500;

const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const { activeTabId, diffReview, openDiffReview } = useEditor(projectId);
  const activeFile = useFile(activeTabId);
  const updateFile = useUpdateFile();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingChanges = usePendingChanges(projectId);
  const autoOpenedChangesetsRef = useRef<Set<string>>(new Set());

  const isActiveFileBinary = activeFile && activeFile.storageId;
  const isActiveFileText = activeFile && !isActiveFileBinary;

  const isDiffReviewOpen = diffReview.isOpen && pendingChanges && pendingChanges.length > 0;

  const currentChange = isDiffReviewOpen
    ? pendingChanges[diffReview.currentChangeIndex]
    : null;

  // Auto-open diff review when new changesetIds are detected
  useEffect(() => {
    if (pendingChanges === undefined) return;

    if (pendingChanges.length === 0) {
      autoOpenedChangesetsRef.current.clear();
      return;
    }

    // Find any changesets that we haven't seen/auto-opened yet
    const newChangesets = pendingChanges.filter(
      (change) => change.changesetId && !autoOpenedChangesetsRef.current.has(change.changesetId)
    );

    if (newChangesets.length > 0) {
      // Record all changesetIds as seen
      newChangesets.forEach((change) => {
        if (change.changesetId) {
          autoOpenedChangesetsRef.current.add(change.changesetId);
        }
      });

      // Auto-open the diff review if not already open
      if (!diffReview.isOpen) {
        openDiffReview(pendingChanges.length);
      }
    }
  }, [pendingChanges, diffReview.isOpen, openDiffReview]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeTabId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center bg-sidebar">
        <TopNavigation projectId={projectId} />
      </div>

      {/* Diff Review Bar - shown when reviewing changes */}
      {isDiffReviewOpen && (
        <DiffReviewBar
          projectId={projectId}
          changes={pendingChanges.map((c) => ({
            _id: c._id,
            changesetId: c.changesetId,
            fileName: c.fileName,
            operation: c.operation,
            newName: c.newName,
            status: c.status,
          }))}
        />
      )}

      {/* Regular breadcrumbs only when not in diff review */}
      {!isDiffReviewOpen && activeTabId && <FileBreadCrumbs projectId={projectId} />}

      <div className="flex-1 min-h-0 bg-background">
        {/* Diff Review Mode */}
        {isDiffReviewOpen && currentChange ? (
          <DiffViewer
            key={currentChange._id}
            fileName={currentChange.fileName}
            oldContent={currentChange.oldContent ?? ""}
            newContent={currentChange.newContent ?? ""}
            operation={currentChange.operation}
            newName={currentChange.newName}
          />
        ) : (
          <>
            {/* Normal editor mode */}
            {!activeFile && (
              <div className="size-full flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Axiom"
                  width={50}
                  height={50}
                  className="opacity-25"
                />
              </div>
            )}
            {isActiveFileText && (
              <CodeEditor
                key={activeFile._id}
                fileName={activeFile.name}
                intialValue={activeFile.content}
                onChange={(content: string) => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    updateFile({ id: activeFile._id, content });
                  }, DEBOUNCE_TIME);
                }}
              />
            )}

            {isActiveFileBinary && (
              <BinaryFileView
                key={activeFile._id}
                fileId={activeFile._id}
                fileName={activeFile.name}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditorView;
