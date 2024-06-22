import { CSSProperties, ReactNode, useCallback, useEffect } from "react";
import { throttle } from 'lodash-es';
import useAutoTodo from "@/hooks/useAutoTodo";

export default function Modal(
    { children,
        onFirstClick,
        classNames,
        styles = {},
        defaultWidth = 400,
        defaultHeight = 300,
        url
    }:
        {
            onFirstClick?: () => Promise<void>,
            children: ReactNode; classNames?: string; styles?: CSSProperties; defaultWidth?: number; defaultHeight?: number; url: string;
        }
) {
    const { asyncTodoData } = useAutoTodo();

    useEffect(() => {
        window.ipcRenderer.on("win-close", () => {
            console.log('win-close');
            asyncTodoData();
        });
    }, [asyncTodoData])

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
        window.ipcRenderer.invoke("CreateWin", {
            url,
            options: {
                "width": defaultWidth,
                "height": defaultHeight,
                x: newX,
                y: newY,
            }
        })

    }, [defaultHeight, defaultWidth, onFirstClick, url])

    return <span onClick={throttle(onAdd, 500)} className={`${classNames}`} style={styles}>
        {children}
    </span>
}