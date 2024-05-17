import { Todo } from "@/types/todo";
import { Checkbox, Collapse, CollapseProps } from "antd";

export default function QuadrantsItem({ data }: { data: Todo[] }) {
    console.log(data, 'data')
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <p>收集箱 <span className=" text-[#ccc]">{data.length}</span></p>,
            children: <div>
                {
                    data.map(d => <p key={d.id}>{d.title}</p>)
                }
            </div>,
        },
        {
            key: '2',
            label: '已完成',
            children: <p>暂无数据</p>,
        },
    ];

    return <Collapse defaultActiveKey={['1']} ghost items={items} />
}