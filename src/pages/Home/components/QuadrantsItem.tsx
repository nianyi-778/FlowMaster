import { Button, Form, Input } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCallback } from 'react';
dayjs.extend(customParseFormat);


export default function QuadrantsItem() {
    const [form] = Form.useForm();

    const onFinish = useCallback((values: {
        title: string;
        describe?: string;
        time?: string;
    }) => {
        console.log(values);
    }, [])


    // bg-white h-full rounded-[20px] p-[10px]
    return <div className="  h-full overflow-hidden ">
        <p className=' text-[12px] text-gray-400 '>
            时间，标题，描述（支持 文字/图片/视频/）、标签       </p>
        <Form
            layout={"vertical"}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item label="标题" name={'title'} rules={[{ required: true }]} >
                <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item label="描述" name={"describe"}>
                <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
            <Form.Item label="截止时间" name={"endTime"}>
                <Input placeholder="请输入截止时间（YYYY-MM-DD HH:mm:ss）" />
            </Form.Item>

            <Form.Item  >
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    </div>
}