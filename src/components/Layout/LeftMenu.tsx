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
                    style={
                        active === item.key ? {
                            backgroundColor: "#e6f4ff",
                            color: "#1677ff"
                        } : {}
                    }
                    className={`transition-all bg-transparent  cursor-pointer rounded-[8px] mx-[4px] my-[4px] ${active === item.key ? '' : "hover:bg-gray-100"} `}>
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