import { Todo } from "@/types/todo";
import { Collapse, CollapseProps } from "antd";
import styles from '../index.module.less';
import Item from './Item';

export default function QuadrantsItem({ data }: { data: Todo[] }) {
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <p><span className=" font-bold text-[14px]">收集箱</span> <span className=" text-[#ccc]">{data.length}</span></p>,
            children: <div>
                {
                    data.map(d => <Item key={d.id} />)
                }
            </div>,
        },
        {
            key: '2',
            label: <p><span className=" font-bold text-[14px]">已完成</span> <span className=" text-[#ccc]">{data.length}</span></p>,
            children: <p>暂无数据</p>,
        },
    ];

    return <Collapse className={styles.collapse} size="small" defaultActiveKey={['1']} ghost items={items} />
}