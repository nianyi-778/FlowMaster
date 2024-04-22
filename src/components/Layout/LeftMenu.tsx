import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useState } from 'react';
import { homeConfig, defaultHome } from '@/constants/config';
import Icon from '@/components/Icon';


export default function LeftMenu() {
    const navigate = useNavigate();
    const [active, setActive] = useState(1);

    return <div>
        <ul>
            {
                homeConfig.concat(defaultHome).map(item => {
                    const isActive = active === item.id;
                    return <li key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            item.link && navigate(item.link);
                        }}
                        style={
                            isActive ? {
                                backgroundColor: "#e6f4ff",
                                color: "#1677ff"
                            } : {}
                        }
                        className={`transition-all bg-transparent  cursor-pointer rounded-[8px] mx-[4px] my-[4px] ${isActive ? '' : "hover:bg-gray-100"} `}>
                        <Tooltip placement="right" title={item.title} >
                            <span className=' h-[40px] flex w-full items-center justify-center'>
                                <Icon name={item.icon}></Icon>
                            </span>
                        </Tooltip>
                    </li>
                })
            }
        </ul>
    </div>
}