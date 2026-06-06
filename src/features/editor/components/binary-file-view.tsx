import React, { useMemo } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useFileUrl } from "@/features/projects/hooks/use-file";
import {
  FileIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  FileTextIcon,
  TypeIcon,
  DownloadIcon,
  LoaderIcon,
  FileWarningIcon,
} from "lucide-react";

type FileCategory = "image" | "video" | "audio" | "pdf" | "font" | "unknown";

const IMAGE_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "gif", "webp", "svg", "ico", "bmp", "avif",
]);
const VIDEO_EXTENSIONS = new Set([
  "mp4", "webm", "ogg", "mov", "avi",
]);
const AUDIO_EXTENSIONS = new Set([
  "mp3", "wav", "ogg", "flac", "aac", "m4a", "wma",
]);
const FONT_EXTENSIONS = new Set([
  "woff", "woff2", "ttf", "otf", "eot",
]);

function getFileCategory(fileName: string): FileCategory {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  if (AUDIO_EXTENSIONS.has(ext)) return "audio";
  if (ext === "pdf") return "pdf";
  if (FONT_EXTENSIONS.has(ext)) return "font";
  return "unknown";
}

function getCategoryIcon(category: FileCategory) {
  switch (category) {
    case "image":
      return ImageIcon;
    case "video":
      return VideoIcon;
    case "audio":
      return MusicIcon;
    case "pdf":
      return FileTextIcon;
    case "font":
      return TypeIcon;
    default:
      return FileIcon;
  }
}

function getCategoryLabel(category: FileCategory): string {
  switch (category) {
    case "image":
      return "Image";
    case "video":
      return "Video";
    case "audio":
      return "Audio";
    case "pdf":
      return "PDF Document";
    case "font":
      return "Font File";
    default:
      return "Binary File";
  }
}

interface Props {
  fileId: Id<"files">;
  fileName: string;
}

const BinaryFileView = ({ fileId, fileName }: Props) => {
  const fileUrl = useFileUrl(fileId);
  const category = useMemo(() => getFileCategory(fileName), [fileName]);
  const CategoryIcon = getCategoryIcon(category);
  const categoryLabel = getCategoryLabel(category);

  // Loading state
  if (fileUrl === undefined) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
          <LoaderIcon className="size-8 animate-spin" />
          <span className="text-sm">Loading file…</span>
        </div>
      </div>
    );
  }

  // No URL available
  if (!fileUrl) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="size-16 rounded-2xl bg-muted/50 flex items-center justify-center">
            <FileWarningIcon className="size-8" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground">{fileName}</p>
            <p className="text-xs">File preview is not available</p>
          </div>
        </div>
      </div>
    );
  }

  // Image preview
  if (category === "image") {
    return (
      <div className="size-full flex flex-col items-center justify-center p-6 gap-4 overflow-auto">
        <div className="relative max-w-full max-h-[calc(100%-3rem)] flex items-center justify-center">
          <img
            src={fileUrl}
            alt={fileName}
            className="max-w-full max-h-full object-contain rounded-lg border border-border/50 shadow-sm"
            style={{ imageRendering: "auto" }}
          />
        </div>
        <FileInfoBar
          fileName={fileName}
          categoryLabel={categoryLabel}
          CategoryIcon={CategoryIcon}
          fileUrl={fileUrl}
        />
      </div>
    );
  }

  // Video preview
  if (category === "video") {
    return (
      <div className="size-full flex flex-col items-center justify-center p-6 gap-4 overflow-auto">
        <video
          src={fileUrl}
          controls
          className="max-w-full max-h-[calc(100%-3rem)] rounded-lg border border-border/50 shadow-sm bg-black"
        />
        <FileInfoBar
          fileName={fileName}
          categoryLabel={categoryLabel}
          CategoryIcon={CategoryIcon}
          fileUrl={fileUrl}
        />
      </div>
    );
  }

  // Audio preview
  if (category === "audio") {
    return (
      <div className="size-full flex flex-col items-center justify-center p-6 gap-6">
        <div className="size-24 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
          <MusicIcon className="size-10 text-violet-400" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">{categoryLabel}</p>
        </div>
        <audio src={fileUrl} controls className="w-full max-w-md" />
        <DownloadButton fileUrl={fileUrl} fileName={fileName} />
      </div>
    );
  }

  // PDF preview
  if (category === "pdf") {
    return (
      <div className="size-full flex flex-col">
        <FileInfoBar
          fileName={fileName}
          categoryLabel={categoryLabel}
          CategoryIcon={CategoryIcon}
          fileUrl={fileUrl}
          className="shrink-0 px-4 py-2 border-b border-border/50"
        />
        <iframe
          src={fileUrl}
          title={fileName}
          className="flex-1 w-full bg-white"
        />
      </div>
    );
  }

  // Font / unknown binary — generic view with download
  return (
    <div className="size-full flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-5 max-w-sm text-center">
        <div className="size-20 rounded-2xl bg-muted/50 border border-border/40 flex items-center justify-center">
          <CategoryIcon className="size-9 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">{categoryLabel}</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This file can&apos;t be previewed in the editor. You can download it
          to view it in an external application.
        </p>
        <DownloadButton fileUrl={fileUrl} fileName={fileName} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FileInfoBar({
  fileName,
  categoryLabel,
  CategoryIcon,
  fileUrl,
  className = "",
}: {
  fileName: string;
  categoryLabel: string;
  CategoryIcon: React.ComponentType<{ className?: string }>;
  fileUrl: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs text-muted-foreground ${className}`}
    >
      <CategoryIcon className="size-3.5 shrink-0" />
      <span className="truncate max-w-[200px]">{fileName}</span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">{categoryLabel}</span>
      <span>·</span>
      <DownloadButton fileUrl={fileUrl} fileName={fileName} compact />
    </div>
  );
}

function DownloadButton({
  fileUrl,
  fileName,
  compact = false,
}: {
  fileUrl: string;
  fileName: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <a
        href={fileUrl}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <DownloadIcon className="size-3" />
        <span>Download</span>
      </a>
    );
  }

  return (
    <a
      href={fileUrl}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
        bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      <DownloadIcon className="size-4" />
      Download
    </a>
  );
}

export default BinaryFileView;
