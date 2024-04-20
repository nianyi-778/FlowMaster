import { Empty } from "antd";

export default function QuadrantsEmpty() {

    return <span className=" h-full w-full  flex items-center justify-center">
        <Empty description='没有任务' />
    </span>
}