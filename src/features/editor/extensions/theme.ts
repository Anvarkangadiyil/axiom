
import { EditorView } from "codemirror";

export const customTheme = EditorView.theme(
    {
        "&": {
            outline: "none !important",
            
        },
        ".cm-content": {
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "14px",
        },
        ".cm-scroller": {
            scrollbarWidth: "thin",
            scrollbarColor: "var(--border) transparent",


        }
    }

)