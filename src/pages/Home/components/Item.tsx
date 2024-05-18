import { Checkbox } from "antd";

export default function Item() {

    return <div className="  h-[40px]  hover:bg-[#f8f8f8] rounded-md leading-[40px] px-[12px]">
        <div className="flex h-full">
            <Checkbox></Checkbox>
            <p className="ml-[6px] flex-1 overflow-hidden truncate ">数据源请求偶发性异常</p>
            <div className=" right-0 pl-[6px]">
                {/* Mask */}
                <span className=" text-[#949494] text-[12px]">收集箱</span>
                <span className=" text-[#949494] text-[12px] ml-[4px]">5月15日</span>
            </div>
        </div>
    </div>
}