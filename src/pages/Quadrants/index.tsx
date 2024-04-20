import { useParams } from "react-router-dom"
import { homeConfig } from '@/constants/config';
import { useMemo } from "react";
import styles from './index.module.less';
import QuadrantsEmpty from "./components/QuadrantsEmpty";
import LeftMenu from "@/components/Layout/LeftMenu";

export default function Quadrants() {
    const { type } = useParams();
    const item = useMemo(() => {
        if (type) {
            return homeConfig.find(config => config.id === +type)
        }
        return null;
    }, [type])
    console.log(item);
    return <div className=" bg-[#f2f5fe] w-full h-full flex">
        <div className=' w-[72px] h-full pt-[20px] rounded-r-[10px] overflow-hidden bg-white'>
            <LeftMenu />
        </div>
        <div className=" flex justify-between h-full p-[20px] flex-1">
            <div className={`${styles.container} grid grid-cols-1  gap-4 w-[40%]`}>

                <div className={`${styles.item} p-[10px] aspect-w-1 aspect-h-1 `}>
                    <h2 className=" text-red-500 font-bold no-select">I、重要且紧急</h2>
                </div>
                <div className={`${styles.item} p-[10px] aspect-w-1 aspect-h-1 `}>
                    <h2 className=" text-yellow-500 font-bold no-select">II、重要不紧急</h2>

                </div>
                <div className={`${styles.item} p-[10px] aspect-w-1 aspect-h-1 `}>

                    <h2 className="  text-blue-500 font-bold no-select">III、不重要紧急</h2>
                </div>
                <div className={`${styles.item} p-[10px] aspect-w-1 aspect-h-1 `}>
                    <h2 className=" text-green-500 font-bold no-select">IV、不重要不紧急</h2>
                </div>
            </div>
            <div className=" flex-1 pl-[20px]">
                <QuadrantsEmpty />
            </div>
        </div>
    </div>
}