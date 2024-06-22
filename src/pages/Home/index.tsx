import { useMemo } from "react";
import styles from './index.module.less';
import { PlusOutlined } from "@ant-design/icons";
import { Quadrant, Todo } from '@/types/todo';
import QuadrantsItem from "./components/QuadrantsItem";
import Modal from '@/components/Modal';
import { useTodoStore } from '@/store/todo';
import useAutoTodo from "@/hooks/useAutoTodo";

export default function Quadrants() {
    const todos = useTodoStore((state: { list: Todo[] }) => state.list);
    useAutoTodo();

    const { a, b, c, d } = useMemo(() => {
        return todos.reduce<{
            a: Todo[];
            b: Todo[];
            c: Todo[];
            d: Todo[]
        }>((all: { a: Todo[]; b: Todo[]; c: Todo[]; d: Todo[]; }, cur: Todo) => {
            switch (cur.priority) {
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


    return <div className=" bg-[#f8faff] w-full h-full flex flex-col overflow-y-auto">
        <h1 className=" font-bold text-[24px] px-[14px] flex items-center justify-between">
            <span>四象限</span>
        </h1>
        <div className=" flex justify-between h-[calc(100%-36px)] p-[14px] flex-1">
            <div className={`${styles.container} grid   gap-3`}>
                <div className={`${styles.item} bg-white relative  overflow-hidden  group  px-[10px] pt-[10px]  border-[1px] border-transparent aspect-w-1 aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col h-full ">
                        <h2 className="  font-bold no-select flex justify-between  h-[24px]">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['I'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#ef4444] before:text-white text-[#ef4444]"> 重要且紧急</span>
                            <Modal url={`/addTodo/${Quadrant.First}`}>
                                <PlusOutlined className="group-hover:visible transition-all add_icon invisible cursor-pointer   text-[#919191] p-[4px] flex items-center justify-center hover:bg-[#f2f2f2]" />
                            </Modal>
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            <QuadrantsItem data={a}></QuadrantsItem>
                        </div>
                    </div>
                </div>
                <div className={`${styles.item} bg-white relative flex group flex-col p-[10px] border-[1px] border-transparent aspect-w-1 aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col h-full ">
                        <h2 className="  font-bold no-select flex justify-between  h-[24px]">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['Ⅱ'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#eab308] before:text-white text-[#eab308]"> 重要不紧急</span>
                            <Modal url={`/addTodo/${Quadrant.Second}`}>
                                <PlusOutlined className="group-hover:visible transition-all add_icon invisible cursor-pointer   text-[#919191]  p-[4px]  flex items-center justify-center hover:bg-[#f2f2f2]" />
                            </Modal>
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            <QuadrantsItem data={b}></QuadrantsItem>
                        </div>
                    </div>


                </div>
                <div className={`${styles.item} bg-white relative flex group flex-col p-[10px] aspect-w-1 border-[1px] border-transparent aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col h-full ">
                        <h2 className="  font-bold no-select flex justify-between  h-[24px]">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['Ⅲ'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#3b82f6] before:text-white text-[#3b82f6]"> 不重要但紧急</span>
                            <Modal url={`/addTodo/${Quadrant.Third}`}>
                                <PlusOutlined className="group-hover:visible transition-all add_icon invisible cursor-pointer   text-[#919191]  p-[4px]  flex items-center justify-center hover:bg-[#f2f2f2]" />
                            </Modal>
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            <QuadrantsItem data={c}></QuadrantsItem>
                        </div>
                    </div>

                </div>
                <div className={`${styles.item} p-[10px] relative bg-white flex group flex-col aspect-w-1 border-[1px] border-transparent aspect-h-1  hover:bg-[rgba(255,255,255,.5)]`}>
                    <div className=" overflow-hidden flex  flex-col h-full ">
                        <h2 className="  font-bold no-select flex justify-between  h-[24px]">
                            <span className=" before:text-center before:leading-[20px] before:text-[14px] before:content-['Ⅳ'] before:inline-block before:w-[20px] before:h-[20px] before:rounded-[50%] before:bg-[#22c55e] before:text-white text-[#22c55e]"> 不重要不紧急</span>
                            <Modal url={`/addTodo/${Quadrant.NumberFour}`}>
                                <PlusOutlined className="group-hover:visible transition-all add_icon invisible cursor-pointer   text-[#919191] p-[4px]  flex items-center justify-center hover:bg-[#f2f2f2]" />
                            </Modal>
                        </h2>
                        <div className="flex-1 overflow-y-auto pb-[4px]">
                            <QuadrantsItem data={d}></QuadrantsItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}