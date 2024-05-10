import { useEffect, useState } from "react";
import { appWindow } from '@tauri-apps/api/window'
import { OsType, type } from '@tauri-apps/api/os';
import { MinusOutlined, CloseOutlined, BorderOutlined } from "@ant-design/icons"
import Icon from "../Icon";

export default function Title() {
    const [platform, setPlatform] = useState<OsType | null>(null);
    useEffect(() => {
        (async () => {
            const platformName = await type();
            setPlatform(platformName);
        })()
    }, []);

    useEffect(() => {
        document.getElementById('titlebar-minimize')
            ?.addEventListener('click', () => appWindow.minimize())
        document.getElementById('titlebar-maximize')
            ?.addEventListener('click', () => appWindow.toggleMaximize())
        document.getElementById('titlebar-close')
            ?.addEventListener('click', () => appWindow.close())
    }, [])

    if (platform === "Darwin") {
        // macOS
        return <div className="bg-[#f8faff] h-full flex" data-tauri-drag-region>
            <div className="w-[52px] bg-[#f2f4fe] flex justify-around items-center px-[2px] group">
                <span className=" overflow-hidden w-[12px] h-[12px] bg-[#ec6a5f] rounded-full border-[#df5f53] border flex items-center justify-center">
                    <Icon id="titlebar-close" classNames="invisible text-[10px] group-hover:visible" name="icon-a-Mac_IconClose_Hover"></Icon>
                </span>
                <span className=" overflow-hidden w-[12px] h-[12px] bg-[#f3bf4f] rounded-full border-[#d4a748] border  flex items-center justify-center">
                    <Icon id="titlebar-minimize" classNames="invisible text-[10px] group-hover:visible" name="icon-a-Mac_IconMinimize_Hover"></Icon>
                </span>
                <span className="overflow-hidden w-[12px] h-[12px] bg-[#61c554] rounded-full border-[#51ba43] border  flex items-center justify-center">
                    <Icon id="titlebar-maximize" classNames="invisible text-[10px] group-hover:visible " name="icon-a-Mac_IconFold_Hover"></Icon>
                </span>
            </div>
        </div>
    }

    //  windows
    return <div data-tauri-drag-region className=" bg-[#f8faff] h-full flex justify-end ">
        <span id="titlebar-minimize" className="  w-[46px] flex items-center justify-center hover:bg-[#eaecf1]">
            <MinusOutlined />
        </span>
        <span id="titlebar-maximize" className="  w-[46px] flex items-center justify-center hover:bg-[#eaecf1]">
            <BorderOutlined />
        </span>
        <span id="titlebar-close" className="  w-[46px] flex items-center justify-center hover:bg-red-500 hover:text-white">
            <CloseOutlined />
        </span>
    </div>
}