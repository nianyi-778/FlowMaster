import { CSSProperties, ReactNode, useCallback } from "react";
import { throttle } from 'lodash-es';

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

    const onAdd = useCallback(async (event: { screenX: number; screenY: number; }) => {
        await onFirstClick?.();

        const space = 20;
        let x = event.screenX;
        let y = event.screenY;
        const { width: screenWidth, height: screenHeight } = window.screen;
        if (x < 0) {
            // 说明在副屏
            x += screenWidth;
        }
        if (y < 0) {
            // 说明在副屏
            y = y + screenHeight;
        }

        let newX = x + space;
        const newY = y - space;
        console.log(x + screenWidth, y, screenWidth);
        if ((newX + defaultWidth) > screenWidth) {
            newX = x - space - defaultWidth;
        }
        console.log(newX, 'newx');
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