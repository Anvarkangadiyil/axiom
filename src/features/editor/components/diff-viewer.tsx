"use client";

import { useEffect, useRef, useMemo } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { MergeView } from "@codemirror/merge";
import { oneDark } from "@codemirror/theme-one-dark";
import { getLanguageExtension } from "../extensions/language-extension";
import { cn } from "@/lib/utils";
import { FileIcon } from "@react-symbols/icons/utils";

interface DiffViewerProps {
  fileName: string;
  oldContent: string;
  newContent: string;
  operation: "update" | "create" | "delete" | "rename";
  newName?: string;
}

const operationLabels: Record<string, { label: string; className: string }> = {
  update: { label: "Modified", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  create: { label: "Created", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  delete: { label: "Deleted", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  rename: { label: "Renamed", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
};

const DiffViewer = ({
  fileName,
  oldContent,
  newContent,
  operation,
  newName,
}: DiffViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mergeViewRef = useRef<MergeView | null>(null);

  const languageExtension = useMemo(() => {
    return getLanguageExtension(fileName);
  }, [fileName]);

  const { label, className: badgeClass } = operationLabels[operation] ?? operationLabels.update;

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous
    if (mergeViewRef.current) {
      mergeViewRef.current.destroy();
      mergeViewRef.current = null;
    }

    const sharedExtensions = [
      oneDark,
      languageExtension,
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      EditorView.theme({
        "&": {
          height: "100%",
          fontSize: "13px",
        },
        ".cm-scroller": {
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        },
        ".cm-gutters": {
          backgroundColor: "transparent",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        },
        // Deleted lines (in the "a" side / original)
        ".cm-changedLine": {
          backgroundColor: "rgba(239, 68, 68, 0.08) !important",
        },
        ".cm-changedText": {
          backgroundColor: "rgba(239, 68, 68, 0.2) !important",
        },
        // Inserted lines (in the "b" side / modified)
        ".cm-insertedLine": {
          backgroundColor: "rgba(34, 197, 94, 0.08) !important",
        },
        ".cm-insertedText": {
          backgroundColor: "rgba(34, 197, 94, 0.2) !important",
        },
        ".cm-deletedLine": {
          backgroundColor: "rgba(239, 68, 68, 0.08) !important",
        },
        ".cm-deletedText": {
          backgroundColor: "rgba(239, 68, 68, 0.2) !important",
        },
        // Merge view specific
        ".cm-mergeView": {
          height: "100%",
        },
        ".cm-mergeViewEditor": {
          height: "100%",
        },
        ".cm-merge-spacer": {
          backgroundColor: "rgba(255,255,255,0.03)",
        },
      }),
    ];

    const mergeView = new MergeView({
      parent: containerRef.current,
      a: {
        doc: oldContent,
        extensions: sharedExtensions,
      },
      b: {
        doc: newContent,
        extensions: sharedExtensions,
      },
      collapseUnchanged: {
        margin: 3,
        minSize: 4,
      },
    });

    mergeViewRef.current = mergeView;

    return () => {
      mergeView.destroy();
      mergeViewRef.current = null;
    };
  }, [oldContent, newContent, languageExtension]);

  return (
    <div className="flex flex-col h-full">
      {/* File header */}
      <div className="flex items-center gap-3 px-4 py-2 bg-sidebar border-b border-border">
        <FileIcon fileName={fileName} autoAssign className="size-4" />
        <span className="text-sm text-foreground font-medium">
          {operation === "rename" && newName ? (
            <>
              <span className="text-muted-foreground line-through">{fileName}</span>
              <span className="text-muted-foreground mx-1.5">→</span>
              <span>{newName}</span>
            </>
          ) : (
            fileName
          )}
        </span>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full border font-medium",
            badgeClass,
          )}
        >
          {label}
        </span>
      </div>

      {/* Side-by-side headers */}
      <div className="flex border-b border-border">
        <div className="flex-1 px-4 py-1.5 text-xs text-muted-foreground bg-red-500/5 border-r border-border">
          Original
        </div>
        <div className="flex-1 px-4 py-1.5 text-xs text-muted-foreground bg-emerald-500/5">
          Modified
        </div>
      </div>

      {/* Diff content */}
      <div ref={containerRef} className="flex-1 min-h-0 overflow-auto bg-background" />
    </div>
  );
};

export default DiffViewer;
