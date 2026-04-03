import { EditorState, StateField } from "@codemirror/state";
import { showTooltip, Tooltip } from "@codemirror/view";
import { EditorView } from "codemirror";
import { quickEdit, quickEditState, showQuickEditEffect } from "./quick-edit";

let editorView: EditorView | null = null;
const createTooltipForSelection = (state: EditorState): readonly Tooltip[] => {
  const selection = state.selection.main;
  if (selection.empty) {
    return [];
  }

  const isQuickEditActive = state.field(quickEditState);
  if (isQuickEditActive) {
    return [];
  }

  return [
    {
      pos: selection.to,
      above: false,
      strictSide: false,
      create() {
        const dom = document.createElement("div");
        dom.className =
          "bg-popover text-white z-50 rounded-sm border border-input p-2 shadow-md flex flex-row gap-2 text-sm ";

        const addToChatButton = document.createElement("button");
        addToChatButton.textContent = "Add to Chat";
        addToChatButton.className =
          "font-sans p-1 px-2 text-white hover: text-foreground hover:bg-foreground/10 rounded-sm";

        const quickEditButton = document.createElement("button");
        quickEditButton.className =
          "font-sans p-1 px-2 text-white hover: text-foreground hover:bg-foreground/10 rounded-sm";

        const quickEditButtonText = document.createElement("span");
        quickEditButtonText.textContent = "Quick Edit";

        const quickEditButtonShortcut = document.createElement("span");
        quickEditButtonShortcut.textContent = "⌘E ";
        quickEditButtonShortcut.className = "text-small opacity-60";

        quickEditButton.appendChild(quickEditButtonText);
        quickEditButton.appendChild(quickEditButtonShortcut);

        dom.appendChild(addToChatButton);
        dom.appendChild(quickEditButton);

        quickEditButton.onclick = () => {
          if (editorView) {
            editorView.dispatch({ effects: showQuickEditEffect.of(true) });
          }
        };

        return { dom };
      },
    },
  ];
};

const selectionTooltipField = StateField.define<readonly Tooltip[]>({
  create(state) {
    return createTooltipForSelection(state);
  },

  update(tooltips, transaction) {
    if (transaction.docChanged || transaction.selection) {
      return createTooltipForSelection(transaction.state);
    }
    for (const effect of transaction.effects) {
      if (effect.is(showQuickEditEffect)) {
        return createTooltipForSelection(transaction.state);
      }
    }
    return tooltips;
  },

  provide: (field) =>
    showTooltip.computeN([field], (state) => state.field(field)),
});
const captureViewExtention = EditorView.updateListener.of((update) => {
  editorView = update.view;
});

export const selectionTooltip = () => [
  captureViewExtention,
  selectionTooltipField,
];
