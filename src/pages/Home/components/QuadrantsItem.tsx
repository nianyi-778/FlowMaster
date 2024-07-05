import { Todo } from "@/types/todo";
import { Collapse, CollapseProps } from "antd";
import styles from '../index.module.less';
import Item from './Item';
import { useCallback, useEffect, useMemo, useState } from "react";
import QuadrantsEmpty from "./QuadrantsEmpty";

export default function QuadrantsItem({ data }: { data: Todo[] }) {
    const [activeKey, setActiveKey] = useState<string[]>([])
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

    useEffect(() => {
        if (completed.length) {
            setActiveKey((x) => x.includes('2') ? x : x.concat('2'));
        }
        if (uncompleted.length) {
            setActiveKey((x) => x.includes('1') ? x : x.concat('1'));
        }
    }, [completed.length, uncompleted.length])

    const onChange = useCallback((key: string | string[]) => {
        setActiveKey(key as string[]);
    }, [])


    if (!data.length) {
        return <QuadrantsEmpty />
    }

    const items: CollapseProps['items'] = [];

    if (uncompleted.length) {
        items.push({
            key: '1',
            label: <p className=" text-[14px]"><span className=" font-bold">收集箱</span> {
                activeKey.includes('1') ? null : <span className=" text-[#ccc]">{uncompleted.length}</span>
            }</p>,
            children: <div>
                {
                    uncompleted.map(d => <Item key={d.id} priority={d.priority} id={d.id} title={d.title} status={d.status} />)
                }
            </div>,
        })
    }

    if (completed.length) {
        items.push({
            key: '2',
            label: <p className=" text-[14px]"><span className=" font-bold">已完成</span> {
                activeKey.includes('2') ? null : <span className=" text-[#ccc]">{completed.length}</span>
            }</p>,
            children: <div>
                {
                    completed.map(d => <Item key={d.id} id={d.id} priority={d.priority} title={d.title} status={d.status} />)
                }
            </div>,
        })
    }



    return <Collapse className={styles.collapse}
        onChange={onChange}
        activeKey={activeKey}
        size="small" ghost items={items} />
}