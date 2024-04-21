import { Button, Form, Input } from 'antd';
export default function QuadrantsItem() {
    const [form] = Form.useForm();
    // bg-white h-full rounded-[20px] p-[10px]
    return <div className="  h-full ">
        <p>
            时间，标题，描述（支持 文字/图片/视频/）标签       </p>
        <Form
            layout={"vertical"}
            form={form}
        >
            <Form.Item label="标题" name={'title'} rules={[{ required: true }]} >
                <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item label="描述" name={"describe"}>
                <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
            <Form.Item >
                <Button type="primary">提交</Button>
            </Form.Item>
        </Form>
    </div>
}