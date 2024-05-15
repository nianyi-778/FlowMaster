import { useCallback, useRef } from "react"
import { Window, WindowLabel } from "@tauri-apps/api/window"

export default function useWebviewWindow({ windowLabel }: { windowLabel: WindowLabel }) {
    const winRef = useRef<Window | null>(null);
    const createWindow = useCallback(() => {
        if (!winRef.current) {
            winRef.current = new Window(windowLabel);
        }
    }, [])

    return { createWindow }
}