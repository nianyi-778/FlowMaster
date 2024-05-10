import { useEffect, useState } from "react";
import { appWindow } from '@tauri-apps/api/window'
import { OsType, type } from '@tauri-apps/api/os';
import { MinusOutlined, CloseOutlined, BorderOutlined } from "@ant-design/icons"

export default function Title() {
    const [platform, setPlatform] = useState<OsType | null>(null);
    useEffect(() => {
        (async () => {
            const platformName = await type();
            setPlatform(platformName);
        })()
    }, []);

    console.log(platform, 'type');

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
            <div className="w-[52px] bg-[#f2f4fe]">
                2
            </div>
            <div className=" flex-1"></div>
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