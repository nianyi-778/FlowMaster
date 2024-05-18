import { useParams } from "react-router-dom"
import { homeConfig } from '@/constants/config';
import { useCallback, useMemo, useState } from "react";
import styles from './index.module.less';
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Quadrant, Todo } from '@/types/todo';
import { Checkbox } from 'antd';
import { WebviewWindow } from '@tauri-apps/api/WebviewWindow';
import { getCurrent } from '@tauri-apps/api/window';
import QuadrantsItem from "./components/QuadrantsItem";

export default function Quadrants() {
    const { type = 1 } = useParams();
    const [todos, setTodos] = useState<Todo[]>([]);
    const item = useMemo(() => {
        if (type) {
            return homeConfig.find(config => config.id === +type)
        }
        return null;
    }, [type])

    const onAdd = useCallback(async (event: any) => {
        const windowLabel = 'AddTodoModal';
        var x = event.screenX;
        var y = event.screenY;
        const curWin = await getCurrent();
        const { width: screenWidth } = window.screen;
        const defaultWidth = 400;
        const defaultHeight = 300;
        let newX = x + 20;
        let newY = y - 20;

        if (newX + defaultWidth > screenWidth) {
            newX = x - 20 - defaultWidth;
        }

        const webview = new WebviewWindow(windowLabel, {
            url: '/AddTodo',
            "width": defaultWidth,
            "height": defaultHeight,
            x: newX,
            y: newY,
            decorations: false,
            parent: curWin,
            shadow: true,
            focus: true,
            center: false,
            resizable: false,
            contentProtected: true
        })
        webview.once('tauri://created', function () {
            // webview window successfully created
        })
        webview.once('tauri://error', function () {
            // an error occurred during webview window creation
        })
        curWin.once("tauri://focus", function () {
            // 获取焦点
            webview.close();
        })
    }, [])

    useEffect(() => {
        // const addTodo = async (label: string, id: string) => {
        //     invoke('new_todo', { todo: { id, label, done: false, is_delete: false, todo_type: 3 } })
        // }
        // addTodo('likai2', Date.now() + '');
        if (type) {
            invoke<Todo[]>('get_todos', { todoType: +type }).then((res) => {
                if (Array.isArray(res)) {
                    setTodos(res);
                }
            })
        }

    }, [type])

    const { a, b, c, d } = useMemo(() => {
        return todos.reduce<{
            a: Todo[];
            b: Todo[];
            c: Todo[];
            d: Todo[]
        }>((all, cur: Todo) => {
            switch (cur.quadrant) {
                case Quadrant.First:
                    all.a.push(cur)
                    break;
                case Quadrant.Second:
                    all.b.push(cur)
                    break;
                case Quadrant.Third:
                    all.c.push(cur)
                    break;
                case Quadrant.NumberFour:
                    all.d.push(cur)
                    break;
                default:
                    break;
            }
            return all;
        }, {
            a: [],
            b: [],
            c: [],
            d: []
        })
    }, [todos])


    console.log(a, b, c, d, item);
    return <div className=" bg-[#f8faff] w-full h-full flex flex-col overflow-y-auto">
        <h1 className=" font-bold text-[24px] px-[14px] flex items-center justify-between">
            <span>四象限</span>
        </h1>
        <div className=" flex justify-between h-[calc(100%-36px)] p-[14px] flex-1">
            <div className={`${styles.container} grid   gap-3`}>
                <div className={`${styles.item} bg-white relative  overflow-hidden  group  px-[10px] pt-[10px]  border-[1px] border-transparent aspect-w-1 aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col h-full ">
                        <h2 className="  font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['I'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#ef4444] before:text-white text-[#ef4444]"> 重要且紧急</span>
                            <PlusOutlined onClick={onAdd} className="group-hover:visible transition-all add_icon invisible cursor-pointer  inline-block text-[#919191] leading-[22px] w-[22px] h-[22px] hover:bg-[#f2f2f2]" />
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            <QuadrantsItem data={a}></QuadrantsItem>
                        </div>
                    </div>
                </div>
                <div className={`${styles.item} bg-white relative flex group flex-col p-[10px] border-[1px] border-transparent aspect-w-1 aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className="  font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['II'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#eab308] before:text-white text-[#eab308]"> 重要不紧急</span>
                            <PlusOutlined className="group-hover:visible transition-all add_icon invisible cursor-pointer hover:opacity-80 " />
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            <QuadrantsItem data={b}></QuadrantsItem>
                        </div>
                    </div>


                </div>
                <div className={`${styles.item} bg-white relative flex group flex-col p-[10px] aspect-w-1 border-[1px] border-transparent aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className="  font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['III'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#3b82f6] before:text-white text-[#3b82f6]"> 不重要但紧急</span>
                            <PlusOutlined className="group-hover:visible transition-all add_icon invisible cursor-pointer hover:opacity-80 " />
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            {
                                c.map(d => (
                                    <p className=" truncate text-[12px]" key={d.id}>
                                        <Checkbox >{d.title}</Checkbox>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                </div>
                <div className={`${styles.item} p-[10px] relative bg-white flex group flex-col aspect-w-1 border-[1px] border-transparent aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className="  font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['IV'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#22c55e] before:text-white text-[#22c55e]"> 不重要不紧急</span>
                            <PlusOutlined onClick={onAdd} className="group-hover:visible transition-all add_icon invisible cursor-pointer hover:opacity-80 " />
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            {
                                d.map(d => (
                                    <p className=" truncate text-[12px]" key={d.id}>
                                        <Checkbox >{d.title}</Checkbox>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}