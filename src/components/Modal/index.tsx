import { CSSProperties, ReactNode, useCallback } from "react";
import { throttle } from 'lodash-es';

export default function Modal(
    { children,
        onFirstClick,
        classNames,
        styles = {},
        windowLabel,
        defaultWidth = 400,
        defaultHeight = 300,
        url
    }:
        {
            onFirstClick?: () => Promise<void>,
            children: ReactNode; classNames?: string; styles?: CSSProperties; windowLabel: string; defaultWidth?: number; defaultHeight?: number; url: string;
        }
) {

    const onAdd = useCallback(async (event: { screenX: number; screenY: number; }) => {
        await onFirstClick?.();

        const space = 20;
        const x = event.screenX;
        const y = event.screenY;
        const { width: screenWidth } = window.screen;
        let newX = x + space;
        const newY = y - space;

        if (newX + defaultWidth > screenWidth) {
            newX = x - space - defaultWidth;
        }
        console.log(window.ipcRenderer, 'window.ipcRenderer')
        window.ipcRenderer.send("CreateWin", {
            url,
            options: {
                "width": defaultWidth,
                "height": defaultHeight,
                x: newX,
                y: newY,
            }
        })
        // const webview = new WebviewWindow(windowLabel, {
        //     url,
        //     "width": defaultWidth,
        //     "height": defaultHeight,
        //     x: newX,
        //     y: newY,
        //     decorations: false,
        //     parent: curWin,
        //     shadow: true,
        //     focus: true,
        //     center: false,
        //     resizable: false,
        //     contentProtected: true
        // })
        // webview.listen('tauri://focus', () => {
        //     console.log('Window focused');
        // });
        // webview.once('tauri://created', async function () {
        //     // const isFocused = await webview.isFocused();
        //     // if (!isFocused) {
        //     //     setTimeout(() => {
        //     //         webview.setFocus();
        //     //     }, 500);
        //     // }
        // })
        // webview.once('tauri://error', function () {
        //     // an error occurred during webview window creation
        // })
        // curWin.once("tauri://focus", function () {
        //     // 获取焦点
        //     webview.close();
        // })
    }, [defaultHeight, defaultWidth, onFirstClick, url])

    return <span onClick={throttle(onAdd, 500)} className={`${classNames}`} style={styles}>
        {children}
    </span>
}