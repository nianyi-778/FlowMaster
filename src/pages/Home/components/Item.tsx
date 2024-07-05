import Modal from '@/components/Modal';
import { useTodoStore } from '@/store'
import { Tooltip, type CheckboxProps } from 'antd';
import MoCheckbox from "@/components/Checkbox";
import { Todo } from '@/types/todo';

export default function Item({ title, id, status, priority }: { title: string, id: number; status: 0 | 1; priority: Todo['priority'] }) {
    const setCurrent = useTodoStore((state) => state.setCurrent)
    const onChange: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked
        window.ipcRenderer.send("TodoCurd", {
            status: checked ? 1 : 0,
            id: id
        });
    };

    return <div className={`h-[40px] hover:bg-[#f8f8f8] rounded-md leading-[40px] px-[12px] cursor-default`}>
        <div className={`flex h-full ${status ? 'text-[#d1d1d1]' : ''}`}>
            <MoCheckbox onChange={onChange} checked={!!status} priority={priority}></MoCheckbox>
            <Modal onFirstClick={async () => {
                setCurrent(id);
            }} url={`/updateTodo/${id}`} classNames="flex-1 overflow-hidden">
                <p className={`ml-[6px]  overflow-hidden truncate `}>
                    <Tooltip title={title} placement='topLeft'>
                        {title}
                    </Tooltip>
                </p>
            </Modal>
            <div className=" right-0 pl-[6px] ">
                {/* Mask */}
                <span className={`${status ? 'text-[#d1d1d1]' : 'text-[#949494]'} text-[12px] inline-block`}>收集箱</span>
                {/* <span className=" text-[#949494] text-[12px] ml-[4px] inline-block">5月15日</span> */}
            </div>
        </div>
    </div>
}