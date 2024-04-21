import { useParams } from "react-router-dom"
import { homeConfig } from '@/constants/config';
import { useCallback, useMemo, useState } from "react";
import styles from './index.module.less';
import QuadrantsEmpty from "./components/QuadrantsEmpty";
import QuadrantsItem from "./components/QuadrantsItem";
import LeftMenu from "@/components/Layout/LeftMenu";
import { PlusCircleTwoTone } from "@ant-design/icons";



export default function Quadrants() {
    const { type } = useParams();
    const [open, setOpen] = useState(false);
    const item = useMemo(() => {
        if (type) {
            return homeConfig.find(config => config.id === +type)
        }
        return null;
    }, [type])

    const onAdd = useCallback(() => {
        setOpen(true);
    }, [])

    console.log(item);
    return <div className=" bg-[#f2f5fe] w-full h-full flex">
        <div className=' w-[72px] h-full pt-[20px] rounded-r-[20px] overflow-hidden bg-white'>
            <LeftMenu />
        </div>
        <div className=" flex justify-between h-full p-[20px] flex-1">
            <div className={`${styles.container} grid grid-cols-1  gap-4 w-[40%]`}>
                <div className={`${styles.item} bg-white group p-[10px]  border-[1px] border-transparent aspect-w-1 aspect-h-1 hover:border-red-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <h2 className=" text-red-500 font-bold no-select flex justify-between">
                        <span>I、重要且紧急</span>
                        <PlusCircleTwoTone onClick={onAdd} className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
                    </h2>

                </div>
                <div className={`${styles.item} bg-white group p-[10px] border-[1px] border-transparent aspect-w-1 aspect-h-1 hover:border-yellow-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <h2 className=" text-yellow-500 font-bold no-select flex justify-between">
                        <span>II、重要不紧急</span>
                        <PlusCircleTwoTone className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
                    </h2>

                </div>
                <div className={`${styles.item} bg-white group p-[10px] aspect-w-1 border-[1px] border-transparent aspect-h-1 hover:border-blue-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <h2 className=" text-blue-500 font-bold no-select flex justify-between">
                        <span>III、不重要紧急</span>
                        <PlusCircleTwoTone className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
                    </h2>

                </div>
                <div className={`${styles.item} p-[10px] bg-white group aspect-w-1 border-[1px] border-transparent aspect-h-1 hover:border-green-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <h2 className=" text-green-500 font-bold no-select flex justify-between">
                        <span>IV、不重要不紧急</span>
                        <PlusCircleTwoTone className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
                    </h2>
                </div>
            </div>
            <div className=" flex-1 pl-[20px]">
                <QuadrantsItem />
            </div>
        </div>
    </div>
}