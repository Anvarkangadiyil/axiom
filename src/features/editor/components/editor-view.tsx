import React, { useEffect, useRef } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import TopNavigation from "./top-navigation";
import { useEditor } from "../hooks/use-edior";
import FileBreadCrumbs from "./file-breadcrumbs";
import { useFile, useUpdateFile } from "@/features/projects/hooks/use-file";
import Image from "next/image";
import CodeEditor from "./code-editor";

const DEBOUNCE_TIME = 1500;

const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const { activeTabId } = useEditor(projectId);
  const activeFile = useFile(activeTabId);
  const updateFile = useUpdateFile();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActiveFileBinary = activeFile && activeFile.storageId;
  const isActiveFileText = activeFile && !isActiveFileBinary;

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
      {activeTabId && <FileBreadCrumbs projectId={projectId} />}
      <div className="flex-1 min-h-0 bg-background">
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

        {isActiveFileBinary && <p>TODO: Implement</p>}
      </div>
    </div>
  );
};

export default EditorView;
