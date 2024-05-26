import { Checkbox } from "antd";
import Modal from '@/components/Modal';
import { useTodoStore } from '@/store'
import type { CheckboxProps } from 'antd';
import { invoke } from "@tauri-apps/api/core";

export default function Item({ title, describe, id }: { title: string, describe?: string; id: string }) {
    const setCurrent = useTodoStore((state) => state.setCurrent)

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
        invoke<boolean>('toggle_done', { id: id.toString() }).then((res) => {
            console.log(res);
        })
    };

    return <div className={`h-[40px] hover:bg-[#f8f8f8] rounded-md leading-[40px] px-[12px] cursor-default`}>
        <div className="flex h-full">
            <Checkbox onChange={onChange}></Checkbox>
            <Modal onFirstClick={async () => {
                setCurrent(id);
            }} windowLabel="updateTodoModal" url={`/updateTodo/${id}`} classNames="flex-1">
                <p className={`ml-[6px]  overflow-hidden truncate `}>{title}</p>
            </Modal>
            <div className=" right-0 pl-[6px] ">
                {/* Mask */}
                <span className=" text-[#949494] text-[12px]">收集箱</span>
                <span className=" text-[#949494] text-[12px] ml-[4px]">5月15日</span>
            </div>
        </div>
    </div>
}