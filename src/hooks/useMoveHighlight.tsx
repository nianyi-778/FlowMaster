import { useEffect } from "react";



export default function useMoveHighlight({
    animation = true
}: {
    animation?: boolean
}) {

    useEffect(() => {
        function onMousemove(event: MouseEvent) {
            const elements = document.getElementsByClassName("element");
            // 获取鼠标位置
            const mouseX = event.pageX;
            const mouseY = event.pageY;

            // 遍历元素并输出距离鼠标的坐标
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLDivElement;
                const rect = element.getBoundingClientRect();
                const elementX = rect.left + window.pageXOffset;
                const elementY = rect.top + window.pageYOffset;

                const distanceX = mouseX - elementX;
                const distanceY = mouseY - elementY;

                // 将距离值设置到每一个卡片元素上面
                element.style.setProperty('--x', distanceX + 'px');
                element.style.setProperty('--y', distanceY + 'px');
            }
        }
        if (animation) {
            // 添加鼠标移动事件监听器
            document.addEventListener("mousemove", onMousemove);
        }

        return () => {
            document.removeEventListener("mousemove", onMousemove)
        };
    }, [animation])

}