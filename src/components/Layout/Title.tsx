import { useEffect } from "react";
import Icon from "../Icon";
import { appWindow } from '@tauri-apps/api/window'

export default function Title() {

    useEffect(() => {
        document.getElementById('titlebar-minimize')
            ?.addEventListener('click', () => appWindow.minimize())
        document.getElementById('titlebar-maximize')
            ?.addEventListener('click', () => appWindow.toggleMaximize())
        document.getElementById('titlebar-close')
            ?.addEventListener('click', () => appWindow.close())
    }, [])

    return <div data-tauri-drag-region className=" bg-[#f8faff] h-[28px] flex justify-end ">
        <span id="titlebar-minimize" className="  w-[46px] flex items-center justify-center hover:bg-[#eaecf1]">
            <Icon name="icon-hengxian"></Icon>
        </span>
        <span id="titlebar-maximize" className="  w-[46px] flex items-center justify-center hover:bg-[#eaecf1]">
            <Icon name="icon-sifangxing"></Icon>
        </span>
        <span id="titlebar-close" className="  w-[46px] flex items-center justify-center hover:bg-red-500 hover:text-white">
            <Icon name="icon-close-bold"></Icon>
        </span>
    </div>
}