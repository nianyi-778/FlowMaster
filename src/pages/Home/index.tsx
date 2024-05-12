import { useParams } from "react-router-dom"
import { homeConfig } from '@/constants/config';
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import styles from './index.module.less';
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import { Quadrant, Todo } from '@/types/todo'
import { Checkbox } from 'antd';
import { WebviewWindow } from "@tauri-apps/api/window";


export default function Quadrants() {
    const { type = 1 } = useParams();
    const [todos, setTodos] = useState<Todo[]>([]);
    const item = useMemo(() => {
        if (type) {
            return homeConfig.find(config => config.id === +type)
        }
        return null;
    }, [type])

    const onAdd = useCallback((event: any) => {
        const windowLabel = 'AddTodoModal';
        var x = event.clientX;
        var y = event.clientY;
        console.log("当前窗口的x坐标：" + x);
        console.log("当前窗口的y坐标：" + y);
        const webview = new WebviewWindow(windowLabel, {
            url: '/AddTodo',
            "decorations": false,
            "width": 400,
            "height": 300,
            x: x + 20,
            y: y + 20,
        })
        // since the webview window is created asynchronously,
        // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
        webview.once('tauri://created', function () {
            // webview window successfully created
            invoke("set_window_shadow", { webview, window_name: windowLabel })
        })
        webview.once('tauri://error', function (e) {
            // an error occurred during webview window creation
        })
        webview.once("tauri://blur", function (e) {
            if (e.windowLabel === windowLabel) {
                // 失去焦点，卸载窗口
                webview.close();
            }
        });
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
    return <div className=" bg-[#f8faff] w-full h-full flex overflow-y-auto">
        <div className=" flex justify-between h-full p-[14px] flex-1">
            <div className={`${styles.container} grid   gap-3`}>
                <div className={`${styles.item} bg-white relative  overflow-hidden  group  px-[10px] pt-[10px]  border-[1px] border-transparent aspect-w-1 aspect-h-1 hover:border-red-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className=" text-red-500 font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['I'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#ef4444] before:text-white"> 重要且紧急</span>
                            <PlusOutlined onClick={onAdd} className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            {
                                a.map(d => (
                                    <p className=" truncate text-[12px]" key={d.id}>
                                        <Checkbox >{d.title}</Checkbox>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.item} bg-white relative flex group flex-col p-[10px] border-[1px] border-transparent aspect-w-1 aspect-h-1 hover:border-yellow-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className=" text-yellow-500 font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['II'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#eab308] before:text-white"> 重要不紧急</span>
                            <PlusOutlined className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            {
                                b.map(d => (
                                    <p className=" truncate text-[12px]" key={d.id}>
                                        <Checkbox >{d.title}</Checkbox>
                                    </p>
                                ))
                            }
                        </div>
                    </div>


                </div>
                <div className={`${styles.item} bg-white relative flex group flex-col p-[10px] aspect-w-1 border-[1px] border-transparent aspect-h-1 hover:border-blue-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className=" text-blue-500 font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['III'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#3b82f6] before:text-white"> 不重要紧急</span>
                            <PlusOutlined className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
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
                <div className={`${styles.item} p-[10px] relative bg-white flex group flex-col aspect-w-1 border-[1px] border-transparent aspect-h-1 hover:border-green-300 hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col ">
                        <h2 className=" text-green-500 font-bold no-select flex justify-between">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['IV'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#22c55e] before:text-white"> 不重要不紧急</span>
                            <PlusOutlined className="group-hover:visible transition-all  invisible cursor-pointer hover:opacity-80 " />
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