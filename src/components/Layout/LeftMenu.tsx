import { useNavigate } from "react-router-dom";
import { Tooltip, Avatar } from "antd";
import { useState } from 'react';
import { homeConfig } from '@/constants/config';
import Icon from '@/components/Icon';
import classnames from 'classnames';
import { QuestionCircleFilled, UserOutlined } from "@ant-design/icons";
import styles from './index.module.less';

export default function LeftMenu() {
    const navigate = useNavigate();
    const [active, setActive] = useState(1);

    return <div className={`${styles.title} bg-[#f1f4ff] flex-1 pt-[10px] w-[56px] flex flex-col justify-between`}>
        <ul >
            <li className="mx-[4px]  flex items-center justify-center mb-[10px]">
                <Avatar shape="square" icon={<UserOutlined />} />
            </li>
            {
                homeConfig.map(item => {
                    const isActive = active === item.id;

                    return <li key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            item.link && navigate(item.link);
                        }}
                        className={`transition-all bg-transparent group  cursor-pointer rounded-[8px] mx-[4px] my-[4px] `}>
                        <Tooltip placement="right" title={item.title} >
                            <span className=' h-[50px] flex w-full items-center justify-center'>
                                <Icon name={item.icon} classNames={
                                    classnames([isActive ? "text-[#5171f2]" : "group-hover:text-[#606266] text-[#919298]"], "text-[24px]")
                                }></Icon>
                            </span>
                        </Tooltip>
                    </li>
                })
            }
        </ul>
        <ul className=" pb-[26px]">
            <li className="mx-[4px]  flex items-center justify-center mb-[10px]">
                <QuestionCircleFilled className=" text-[#919298] text-[24px]" />
            </li>
        </ul>
    </div>
}