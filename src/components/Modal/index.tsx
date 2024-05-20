import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { CSSProperties, ReactNode, useCallback } from "react";
import { getCurrent } from '@tauri-apps/api/window';


export default function Modal(
    { children,
        classNames,
        styles = {},
        windowLabel,
        defaultWidth = 400,
        defaultHeight = 300,
        url
    }:
        { children: ReactNode; classNames?: string; styles?: CSSProperties; windowLabel: string; defaultWidth?: number; defaultHeight?: number; url: string; }
) {

    const onAdd = useCallback(async (event: any) => {
        const space = 20;
        var x = event.screenX;
        var y = event.screenY;
        const curWin = await getCurrent();
        const { width: screenWidth } = window.screen;
        let newX = x + space;
        let newY = y - space;

        if (newX + defaultWidth > screenWidth) {
            newX = x - space - defaultWidth;
        }

        const webview = new WebviewWindow(windowLabel, {
            url,
            "width": defaultWidth,
            "height": defaultHeight,
            x: newX,
            y: newY,
            decorations: false,
            parent: curWin,
            shadow: true,
            focus: true,
            center: false,
            resizable: false,
            contentProtected: true
        })
        webview.once('tauri://created', function () {
            // webview window successfully created
        })
        webview.once('tauri://error', function () {
            // an error occurred during webview window creation
        })
        curWin.once("tauri://focus", function () {
            // 获取焦点
            webview.close();
        })
    }, [])

    return <span onClick={onAdd} className={`${classNames}`} style={styles}>
        {children}
    </span>
}