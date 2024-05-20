import { useRef, useState } from "react"
import { Input, Popover, Tooltip } from 'antd';
import Icon from "@/components/Icon";
import styles from './index.module.less';


const { TextArea } = Input;

enum LevelType {
    high = 1,
    medium,
    low,
    none
}


const levels = [
    {
        level: LevelType.high,
        label: "高",
        color: "#c33d30"
    },
    {
        level: LevelType.medium,
        label: "中",
        color: "#eeac3e"
    },
    {
        level: LevelType.low,
        label: "低",
        color: "#5070f2"
    }, {
        level: LevelType.none,
        label: "无",
        color: "#999998"
    }
]


export default function AddTodo() {
    const ref = useRef<HTMLDivElement>(null);
    const [curLevel, setLevel] = useState<LevelType>(LevelType.none);
    const [open, setOpen] = useState(false);
    const curColor = levels.find(l => l.level === curLevel);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const content = <div className=" w-[130px]">{
        levels.map(level => <p onClick={() => {
            setLevel(level.level);
            setOpen(false);
        }}
            className=" cursor-pointer leading-[30px] flex items-center hover:bg-[#f7f7f7] px-[12px]"
            key={level.level}>
            <Icon styles={{
                color: level.color
            }} classNames={`text-[16px] mr-[4px]`} name="icon-hongqi"></Icon>{level.label}优先级
        </p>)
    }</div>

    return <div ref={ref} className=" w-full h-full bg-white ">
        <div className=" flex justify-between items-center px-[20px] h-[44px] border-b-[#f2f2f2] border-b">
            <span>设置日期</span>
            <Popover content={content}
                overlayClassName={styles.level}
                open={open}
                onOpenChange={handleOpenChange}
                placement="bottomLeft" trigger="click">
                <Tooltip title="优先级">
                    <span className=" cursor-pointer">
                        <Icon name="icon-hongqi" classNames={`text-[20px]`} styles={{
                            color: curColor?.color
                        }}></Icon>
                    </span>
                </Tooltip>

            </Popover>
        </div>
        <div className=" px-[10px] w-full">
            <div className=" pt-[2px]">
                <Input size="large" autoFocus className=" border-none hover:border-none focus:shadow-none font-bold focus-within::border-none focus-within:shadow-none" placeholder="准备做什么？" />
            </div>
            <TextArea className=" border-none hover:border-none focus:shadow-none text-[14px] focus-within::border-none focus-within:shadow-none" size="large"
                showCount
                style={{ height: 180, resize: 'none' }}
                placeholder="描述" maxLength={120} />
        </div>
    </div>
}