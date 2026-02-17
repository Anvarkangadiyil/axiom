import { showMinimap } from "@replit/codemirror-minimap";


const createMiniMap = () => {
    const dom = document.createElement("div")
    dom.className = "w-20 h-full bg-sidebar"
    return { dom }
}

export const minimap = () => [
    showMinimap.compute(["doc"], () => {
        return {
            create: createMiniMap,

        }
    })
]