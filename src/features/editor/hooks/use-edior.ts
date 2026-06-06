import { useCallback } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditorStore } from "../store/use-editor-store";

export const useEditor = (projectId: Id<"projects">) => {
  // Use selectors for reactive state (these only re-render when their specific value changes)
  const tabsState = useEditorStore((state) => state.getTabState(projectId));
  const diffReviewState = useEditorStore((state) => state.getDiffReviewState(projectId));

  // Use getState() for actions to avoid subscribing to the whole store
  const openFile = useCallback(
    (fileId: Id<"files">, options: { pinned: boolean }) => {
      useEditorStore.getState().openFile(projectId, fileId, options);
    },
    [projectId],
  );

  const closeTab = useCallback(
    (fileId: Id<"files">) => {
      useEditorStore.getState().closeTab(projectId, fileId);
    },
    [projectId],
  );

  const closeAllTabs = useCallback(() => {
    useEditorStore.getState().closeAllTabs(projectId);
  }, [projectId]);

  const setActiveTab = useCallback(
    (fileId: Id<"files">) => {
      useEditorStore.getState().setActiveTab(projectId, fileId);
    },
    [projectId],
  );

  // Diff review actions
  const openDiffReview = useCallback(
    (totalChanges: number) => {
      useEditorStore.getState().openDiffReview(projectId, totalChanges);
    },
    [projectId],
  );

  const closeDiffReview = useCallback(() => {
    useEditorStore.getState().closeDiffReview(projectId);
  }, [projectId]);

  const navigateChange = useCallback(
    (direction: "next" | "prev") => {
      useEditorStore.getState().navigateChange(projectId, direction);
    },
    [projectId],
  );

  const setCurrentChangeIndex = useCallback(
    (index: number) => {
      useEditorStore.getState().setCurrentChangeIndex(projectId, index);
    },
    [projectId],
  );

  const updateTotalChanges = useCallback(
    (total: number) => {
      useEditorStore.getState().updateTotalChanges(projectId, total);
    },
    [projectId],
  );

  return {
    openTabs: tabsState.openTabs,
    activeTabId: tabsState.activeTabId,
    previewTabId: tabsState.previewTabId,
    openFile,
    closeTab,
    closeAllTabs,
    setActiveTab,
    // Diff review
    diffReview: diffReviewState,
    openDiffReview,
    closeDiffReview,
    navigateChange,
    setCurrentChangeIndex,
    updateTotalChanges,
  };
};
