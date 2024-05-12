import { useCallback, useEffect, useRef, useState } from "react";
import { Window } from '@tauri-apps/api/window';
import { OsType, type } from '@tauri-apps/plugin-os';
import { MinusOutlined, CloseOutlined, BorderOutlined } from "@ant-design/icons"
import Icon from "../Icon";

export default function Title() {
    const appWindow = Window.getCurrent();
    const [platform, setPlatform] = useState<OsType | null>(null);
    useEffect(() => {
        (async () => {
            const platformName = await type();
            setPlatform(platformName);
        })()
    }, []);
    const maximize = useRef(false);

    const handleMinimize = useCallback(() => {
        appWindow.minimize()
    }, [])

    const handleClose = useCallback(() => {
        appWindow.close()
    }, [])
    const handleMaximize = useCallback(() => {
        if (maximize.current) {
            appWindow.unmaximize();
        } else {
            appWindow.toggleMaximize()
        }
        maximize.current = !maximize.current;
    }, [])

    if (platform === "macos") {
        // macOS
        return <div className="bg-[#f8faff] h-full flex" data-tauri-drag-region>
            <div className="w-[52px] bg-[#f2f4fe] flex justify-around items-center px-[2px] group">
                <span onClick={handleClose} className=" overflow-hidden w-[12px] h-[12px] bg-[#ec6a5f] rounded-full border-[#df5f53] border flex items-center justify-center">
                    <Icon classNames="invisible text-[10px] group-hover:visible" name="icon-a-Mac_IconClose_Hover"></Icon>
                </span>
                <span onClick={handleMinimize} className=" overflow-hidden w-[12px] h-[12px] bg-[#f3bf4f] rounded-full border-[#d4a748] border  flex items-center justify-center">
                    <Icon classNames="invisible text-[10px] group-hover:visible" name="icon-a-Mac_IconMinimize_Hover"></Icon>
                </span>
                <span onClick={handleMaximize} className="overflow-hidden w-[12px] h-[12px] bg-[#61c554] rounded-full border-[#51ba43] border  flex items-center justify-center">
                    <Icon classNames="invisible text-[10px] group-hover:visible " name="icon-a-Mac_IconFold_Hover"></Icon>
                </span>
            </div>
        </div>
    }

    //  windows
    return <div
        data-tauri-drag-region
        className=" bg-[#f8faff] h-full flex justify-between before:content=['*']  before:w-[52px] before:inline-block before:bg-[#f2f4fe]"
    >
        <div className="flex flex-1 justify-end" data-tauri-drag-region>
            <span onClick={handleMinimize} className="  w-[46px] flex items-center justify-center hover:bg-[#dadada]">
                <MinusOutlined className=" text-[12px] opacity-80" />
            </span>
            <span onClick={handleMaximize} className="  w-[46px] flex items-center justify-center hover:bg-[#dadada]">
                <BorderOutlined className=" text-[12px] opacity-80" />
            </span>
            <span onClick={handleClose} className="  w-[46px] flex items-center justify-center hover:bg-red-500 hover:text-white">
                <CloseOutlined className=" text-[14px] opacity-80" />
            </span>
        </div>
    </div>
}