import { Checkbox } from "antd";

export default function Item() {

    return <div className=" relative h-[40px]  hover:bg-[#f8f8f8] rounded-md leading-[40px] px-[12px]">
        <div className="flex">
            <Checkbox></Checkbox>
            <p className="ml-[6px] truncate ">阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿阿斯顿</p>
        </div>
        <div className=" absolute h-full top-0 right-0 bg-white pl-[6px]">
            {/* Mask */}
            <span className=" text-[#949494] text-[12px]">收集箱</span>
            <span className=" text-[#949494] text-[12px] ml-[4px]">5月15日</span>
        </div>
    </div>
}