import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useState } from 'react';
import { homeConfig } from '@/constants/config';
import Icon from '@/components/Icon';


export default function LeftMenu() {
    const navigate = useNavigate();
    const [active, setActive] = useState(1);

    return <ul className=" bg-[#f1f4ff]  pt-[20px] w-[62px]" data-tauri-drag-region>
        {
            homeConfig.map(item => {
                const isActive = active === item.id;
                return <li key={item.id}
                    onClick={() => {
                        setActive(item.id);
                        item.link && navigate(item.link);
                    }}
                    style={
                        isActive ? {
                            color: "#1677ff"
                        } : {}
                    }
                    className={`transition-all bg-transparent  cursor-pointer rounded-[8px] mx-[4px] my-[4px] `}>
                    <Tooltip placement="right" title={item.title} >
                        <span className=' h-[40px] flex w-full items-center justify-center'>
                            <Icon name={item.icon}></Icon>
                        </span>
                    </Tooltip>
                </li>
            })
        }
    </ul>
}