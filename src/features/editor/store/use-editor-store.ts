import { create } from "zustand";
import { Id } from "../../../../convex/_generated/dataModel";

interface TabState {
  openTabs: Id<"files">[];
  activeTabId: Id<"files"> | null;
  previewTabId: Id<"files"> | null;
}

const defaultTabState: TabState = {
  openTabs: [],
  activeTabId: null,
  previewTabId: null,
};

interface DiffReviewState {
  isOpen: boolean;
  currentChangeIndex: number;
  totalChanges: number;
}

const defaultDiffReviewState: DiffReviewState = {
  isOpen: false,
  currentChangeIndex: 0,
  totalChanges: 0,
};

interface EditorStore {
  tabs: Map<Id<"projects">, TabState>;
  diffReview: Map<Id<"projects">, DiffReviewState>;

  getTabState: (id: Id<"projects">) => TabState;
  getDiffReviewState: (id: Id<"projects">) => DiffReviewState;

  openFile: (
    projectId: Id<"projects">,
    fileId: Id<"files">,
    options: { pinned: boolean },
  ) => void;

  closeTab: (projectId: Id<"projects">, fileId: Id<"files">) => void;
  closeAllTabs: (projectId: Id<"projects">) => void;

  setActiveTab: (projectId: Id<"projects">, fileId: Id<"files">) => void;

  // Diff review actions
  openDiffReview: (projectId: Id<"projects">, totalChanges: number) => void;
  closeDiffReview: (projectId: Id<"projects">) => void;
  navigateChange: (projectId: Id<"projects">, direction: "next" | "prev") => void;
  setCurrentChangeIndex: (projectId: Id<"projects">, index: number) => void;
  updateTotalChanges: (projectId: Id<"projects">, total: number) => void;
}

export const useEditorStore = create<EditorStore>()((set, get) => ({
  tabs: new Map(),
  diffReview: new Map(),

  getTabState: (id: Id<"projects">) => get().tabs.get(id) ?? defaultTabState,
  getDiffReviewState: (id: Id<"projects">) => get().diffReview.get(id) ?? defaultDiffReviewState,

  openFile: (projectId, fileId, { pinned }) => {
    const tabs = new Map(get().tabs);
    const state = tabs.get(projectId) ?? defaultTabState;
    const { openTabs, previewTabId } = state;
    const isOpen = openTabs.includes(fileId);

    //Case 1: Opening as preview - replace existing preview or add new

    if (!isOpen && !pinned) {
      const newTabs = previewTabId
        ? openTabs.map((id: Id<"files">) => (id === previewTabId ? fileId : id))
        : [...openTabs, fileId];
      tabs.set(projectId, {
        openTabs: newTabs,
        activeTabId: fileId,
        previewTabId: fileId,
      });

      set({ tabs });
      return;
    }

    //Case 2: Opening as pinned - add new tab

    if (!isOpen && pinned) {
      tabs.set(projectId, {
        ...state,
        openTabs: [...openTabs, fileId],
        activeTabId: fileId,
      });
      set({ tabs });
      return;
    }
    // case 3: File already open - just activate (and pin if double click)
    const shouldPin = pinned && previewTabId === fileId;
    tabs.set(projectId, {
      ...state,
      activeTabId: fileId,
      previewTabId: shouldPin ? null : previewTabId,
    });
    set({ tabs });
  },

  closeTab: (projectId, fileId) => {
    const tabs = new Map(get().tabs);
    const state = tabs.get(projectId) ?? defaultTabState;
    const { openTabs, activeTabId, previewTabId } = state;
    const tabIndex = openTabs.indexOf(fileId);

    if (tabIndex === -1) return;

    const newTabs = openTabs.filter((id: Id<"files">) => id !== fileId);

    let newActiveTabId = activeTabId;

    if (activeTabId === fileId) {
      if (newTabs.length === 0) {
        newActiveTabId = null;
      } else if (tabIndex >= newTabs.length) {
        newActiveTabId = newTabs[newTabs.length - 1];
      } else {
        newActiveTabId = newTabs[tabIndex];
      }
    }
    tabs.set(projectId, {
      openTabs: newTabs,
      activeTabId: newActiveTabId,
      previewTabId: previewTabId === fileId ? null : previewTabId,
    });
    set({ tabs });
  },

  closeAllTabs: (projectId) => {
    const tabs = new Map(get().tabs);
    tabs.set(projectId, defaultTabState);
    set({ tabs });
  },

  setActiveTab: (projectId, fileId) => {
    const tabs = new Map(get().tabs);
    const state = tabs.get(projectId) ?? defaultTabState;
    tabs.set(projectId, {
      ...state,
      activeTabId: fileId,
    });
    set({ tabs });
  },

  // ── Diff review actions ──

  openDiffReview: (projectId, totalChanges) => {
    const diffReview = new Map(get().diffReview);
    diffReview.set(projectId, {
      isOpen: true,
      currentChangeIndex: 0,
      totalChanges,
    });
    set({ diffReview });
  },

  closeDiffReview: (projectId) => {
    const diffReview = new Map(get().diffReview);
    diffReview.set(projectId, defaultDiffReviewState);
    set({ diffReview });
  },

  navigateChange: (projectId, direction) => {
    const diffReview = new Map(get().diffReview);
    const state = diffReview.get(projectId) ?? defaultDiffReviewState;
    const newIndex =
      direction === "next"
        ? Math.min(state.currentChangeIndex + 1, state.totalChanges - 1)
        : Math.max(state.currentChangeIndex - 1, 0);
    diffReview.set(projectId, {
      ...state,
      currentChangeIndex: newIndex,
    });
    set({ diffReview });
  },

  setCurrentChangeIndex: (projectId, index) => {
    const diffReview = new Map(get().diffReview);
    const state = diffReview.get(projectId) ?? defaultDiffReviewState;
    diffReview.set(projectId, {
      ...state,
      currentChangeIndex: Math.max(0, Math.min(index, state.totalChanges - 1)),
    });
    set({ diffReview });
  },

  updateTotalChanges: (projectId, total) => {
    const diffReview = new Map(get().diffReview);
    const state = diffReview.get(projectId) ?? defaultDiffReviewState;
    diffReview.set(projectId, {
      ...state,
      totalChanges: total,
      currentChangeIndex: Math.min(state.currentChangeIndex, Math.max(0, total - 1)),
    });
    set({ diffReview });
  },
}));
