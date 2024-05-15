import { useRef } from "react"
import { Input, Space } from 'antd';

const { TextArea } = Input;
export default function AddTodo() {
    const ref = useRef<HTMLDivElement>(null);


    return <div ref={ref} className=" w-full h-full bg-white">
        <div className=" flex justify-between px-[10px] h-[44px] border-b-[#f2f2f2] border-b">
            <span>设置日期</span>
            <span>icon</span>
        </div>
        <div className=" px-[10px]">
            <Space direction="vertical">
                <div className=" pt-[4px]">
                    <Input size="large" className=" border-none hover:border-none focus:shadow-none" placeholder="准备做什么？" />
                </div>
                <TextArea className=" border-none hover:border-none focus:shadow-none" size="large"
                    showCount
                    style={{ height: 180, resize: 'none' }}
                    placeholder="描述" maxLength={120} />
            </Space>
        </div>
    </div>
}