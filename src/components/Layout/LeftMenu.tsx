import {
    ContainerOutlined,
    DesktopOutlined,
    HomeOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useState } from 'react';
export default function LeftMenu() {
    const navigate = useNavigate();
    const [active, setActive] = useState('1');
    const items = [
        {
            label: "Option 1",
            link: "/",
            key: '1',
            icon: <PieChartOutlined />
        },
        {
            label: "Option 2",
            key: '2',
            link: "/",
            icon: <DesktopOutlined />
        }, {
            label: "Option 3",
            key: '3',
            link: "/",
            icon: <ContainerOutlined />
        }, {
            label: "返回首页",
            key: '4',
            icon: <HomeOutlined />,
            link: "/"
        }
    ];

    return <div>
        <ul>
            {
                items.map(item => <li key={item.key}
                    onClick={() => {
                        setActive(item.key);
                        item.link && navigate(item.link);
                    }}
                    className={`transition-all bg-transparent hover:bg-gray-100 cursor-pointer rounded-[8px] mx-[4px] my-[4px] ${active === item.key ? 'bg-[#e6f4ff] text-[#1677ff]' : ""} `}>
                    <Tooltip placement="right" title={item.label} >
                        <span className=' h-[40px] flex w-full items-center justify-center'>
                            {item.icon}
                        </span>
                    </Tooltip>
                </li>)
            }
        </ul>
    </div>
}