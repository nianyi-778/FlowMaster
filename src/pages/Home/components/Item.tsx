import { Checkbox } from "antd";
import Modal from '@/components/Modal';
import { useTodoStore } from '@/store'
import type { CheckboxProps } from 'antd';

export default function Item({ title, description, id }: { title: string, description?: string; id: number }) {
    const setCurrent = useTodoStore((state) => state.setCurrent)
    console.log(description, 'describe');
    const onChange: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked
        window.ipcRenderer.send("TodoCurd", {
            status: checked,
            id: id
        });
    };

    return <div className={`h-[40px] hover:bg-[#f8f8f8] rounded-md leading-[40px] px-[12px] cursor-default`}>
        <div className="flex h-full">
            <Checkbox onChange={onChange}></Checkbox>
            <Modal onFirstClick={async () => {
                setCurrent(id);
            }} url={`/updateTodo/${id}`} classNames="flex-1">
                <p className={`ml-[6px]  overflow-hidden truncate `}>{title}</p>
            </Modal>
            <div className=" right-0 pl-[6px] ">
                {/* Mask */}
                <span className=" text-[#949494] text-[12px] inline-block">收集箱</span>
                <span className=" text-[#949494] text-[12px] ml-[4px] inline-block">5月15日</span>
            </div>
        </div>
    </div>
}