import { SetStateAction, useEffect, useRef, useState } from "react"
import { Input, Popover, Tooltip } from 'antd';
import Icon from "@/components/Icon";
import styles from './index.module.less';
import { useParams } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/core";
import { Quadrant, Todo } from "@/types/todo";
import useUpdateTodoOnClose from "@/hooks/useUpdateTodoOnClose";

const { TextArea } = Input;

const levels = [
    {
        level: Quadrant.First,
        label: "高",
        color: "#c33d30"
    },
    {
        level: Quadrant.NumberFour,
        label: "中",
        color: "#eeac3e"
    },
    {
        level: Quadrant.Second,
        label: "低",
        color: "#5070f2"
    }, {
        level: Quadrant.Third,
        label: "无",
        color: "#999998"
    }
]


export default function AddTodo() {
    const { id, type = Quadrant.Third } = useParams();
    const ref = useRef<HTMLDivElement>(null);
    const [curLevel, setLevel] = useState<Quadrant>(+type);
    const [open, setOpen] = useState(false);
    const curLevelIndex = levels.findIndex(l => l.level === curLevel);
    const [title, setTitle] = useState<string>();
    const [describe, setDescribe] = useState<string>();
    useEffect(() => {
        if (id) {
            invoke<Todo>('get_todo', { id }).then((res) => {
                if (res) {
                    setLevel(res.quadrant);
                    setDescribe(res.describe);
                    setTitle(res.title);
                }
            });
        };
    }, [id]);

    useUpdateTodoOnClose({
        id, title, describe, level: curLevel
    })

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const onInputChange = (e: { target: { value: SetStateAction<string | undefined>; }; }) => {
        setTitle(e.target.value);
    }
    const onTextAreaChange = (e: { target: { value: SetStateAction<string | undefined>; }; }) => {
        setDescribe(e.target.value)
    }

    const content = <div className=" w-[130px]">{
        levels.map(level => <p onClick={() => {
            setLevel(level.level);
            setOpen(false);
        }}
            className={` cursor-pointer leading-[30px] flex items-center hover:bg-[#f7f7f7] px-[12px]`}
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
                            color: levels[curLevelIndex]?.color
                        }}></Icon>
                    </span>
                </Tooltip>

            </Popover>
        </div>
        <div className=" px-[10px] w-full">
            <div className=" pt-[2px]">
                <Input size="large"
                    onChange={onInputChange}
                    value={title} autoFocus className=" border-none hover:border-none focus:shadow-none font-bold focus-within::border-none focus-within:shadow-none" placeholder="准备做什么？" />
            </div>
            <TextArea className=" border-none hover:border-none focus:shadow-none text-[14px] focus-within::border-none focus-within:shadow-none" size="large"
                showCount
                onChange={onTextAreaChange}
                value={describe}
                style={{ height: 180, resize: 'none' }}
                placeholder="描述" maxLength={120} />
        </div>
    </div>
}