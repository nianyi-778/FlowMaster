import useMoveHighlight from '@/hooks/useMoveHighlight';
import { QuestConfig } from '@/constants/config';
// import { Link } from 'react-router-dom';
import { Typography, Divider, Input, FloatButton, notification } from "antd";
import styles from './index.module.less';
import { useState } from 'react';
import { CopyOutlined, OpenAIOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { TextArea } = Input;



type NotificationType = 'success' | 'info' | 'warning' | 'error';
export default function Quest() {
    const [active, setActive] = useState<number>(0);
    const [api, contextHolder] = notification.useNotification();


    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            showProgress: true,
            placement: "bottom",
            message: "消息",
            description: '开发中，请稍等...',
        });
    };

    useMoveHighlight({
        animation: !active
    });

    const questItem = QuestConfig.find(q => q.id === active);


    return <div className={`w-full h-full bg-[#f8faff] overflow-hidden pb-[20px] flex flex-col `} >
        <div className={`transition-all px-[20px]  overflow-hidden  ${active ? ' w-full h-[45px] mt-[20px]' : "  w-full h-full"}`}>
            <div className={`w-full h-full transition-all ${styles.colBox} ${active ? styles.activeColBox : ''}`}>
                {
                    QuestConfig.map(c => {
                        return <div className={styles.col} key={c.id} onClick={() => setActive(c.id)}>
                            <div className={`${styles.element} ${active ? styles.noHover : ''} ${active === c.id ? styles.smallActive : ''}`} >
                                {/* <Link to={`/quadrants/${c.id}`}> */}
                                <div className={styles.maskCover} style={{
                                    backgroundImage: `url("${c.img}")`
                                }}>
                                </div>
                                <div className={styles.mask} >
                                </div>
                                <div className={`${styles.doc} no-select`}>
                                    {
                                        active ? <p>{c.title}</p> : <>
                                            <Title >{c.title}</Title>
                                            <Text >{c.description}</Text>
                                        </>
                                    }

                                </div>
                                {/* </Link> */}

                            </div>
                        </div>
                    })
                }

            </div>
        </div>
        {
            !active ? null : <>
                <Divider />
                <div className={` ${!active ? 'h-[0px]' : 'px-[20px] flex-1'} `}>
                    <TextArea
                        placeholder={questItem?.explain}
                        showCount
                        // autoSize={false}
                        className='h-[calc(100%-20px)!important]  resize-none' //
                    />
                </div>
                <FloatButton.Group
                    shape="circle"
                    style={{ right: 24 }}
                >
                    <FloatButton icon={<CopyOutlined />} tooltip='Copy' />
                    <FloatButton icon={<OpenAIOutlined />} tooltip='AI 分析' onClick={() => {
                        openNotificationWithIcon('warning')
                    }} />
                    {/* <FloatButton.BackTop visibilityHeight={0} /> */}
                </FloatButton.Group>
            </>
        }
        {contextHolder}
    </div>
}