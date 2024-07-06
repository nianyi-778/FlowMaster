import { List, Space, Typography } from "antd";
import Icon from "../Icon";

export default function AboutMe() {
    const data = [
        {
            title: '检查更新',
            icon: "icon-quanju_shengji"
        },
        {
            title: '快捷键',
            icon: "icon-kuaijiejian"
        },
        {
            title: '帮助中心',
            icon: "icon-bangzhuzhongxin"
        },
        {
            title: '反馈与建议',
            icon: "icon-fankui-",
            callback: () => {
                window.ipcRenderer.send("OpenExternal", {
                    url: "https://apps.dtable.cloud/share/vslN52jhU3uiaMooM",
                })
            }
        }, {
            title: '更新日志',
            icon: "icon-gengxinrizhi"
        },
    ];

    return <div className="py-[6px] px-[4px]">
        <List
            itemLayout="horizontal"
            dataSource={data}
            split={false}
            renderItem={(item) => (
                <List.Item
                    style={{
                        padding: "0",
                    }}>
                    <div className="hover:bg-[#f8f8f8] cursor-pointer w-full py-[4px] px-[8px] rounded-sm " onClick={item?.callback}>
                        <Space>
                            <Icon name={item.icon} classNames=" text-[16px]"></Icon>
                            <Typography.Text className=" text-[14px]">{item.title}</Typography.Text>
                        </Space>
                    </div>

                </List.Item>
            )}
        />
    </div>
}