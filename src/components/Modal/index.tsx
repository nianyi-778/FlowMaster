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
    console.log(windowLabel);

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
        window.ipcRenderer.send("CreateWin", {
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