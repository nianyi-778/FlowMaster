import { Todo } from "@/types/todo";
import { Collapse, CollapseProps } from "antd";
import styles from '../index.module.less';
import Item from './Item';
import { useMemo } from "react";

export default function QuadrantsItem({ data }: { data: Todo[] }) {

    const { completed, uncompleted } = useMemo(() => {
        return data.reduce((all: {
            completed: Todo[]
            uncompleted: Todo[]
        }, cur: Todo) => {
            if (cur.status) {
                all.completed.push(cur);
            } else {
                all.uncompleted.push(cur);
            }
            return all;
        }, {
            completed: [],
            uncompleted: []
        })
    }, [data])

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className=" text-[14px]"><span className=" font-bold">收集箱</span> <span className=" text-[#ccc]">{uncompleted.length}</span></p>,
            children: <div>
                {
                    uncompleted.map(d => <Item key={d.id} id={d.id} title={d.title} status={d.status} />)
                }
            </div>,
        },
        {
            key: '2',
            label: <p className=" text-[14px]"><span className=" font-bold">已完成</span> <span className=" text-[#ccc]">{completed.length}</span></p>,
            children: <div>
                {
                    completed.map(d => <Item key={d.id} id={d.id} title={d.title} status={d.status} />)
                }
            </div>,
        },
    ];

    return <Collapse className={styles.collapse} size="small" defaultActiveKey={['1']} ghost items={items} />
}