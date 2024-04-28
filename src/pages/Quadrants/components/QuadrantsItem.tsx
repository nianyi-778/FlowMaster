import { Button, Form, Input, DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

export default function QuadrantsItem() {
    const [form] = Form.useForm();

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    });

    // bg-white h-full rounded-[20px] p-[10px]
    return <div className="  h-full ">
        <p className=' text-[12px] text-gray-400'>
            时间，标题，描述（支持 文字/图片/视频/）、标签       </p>
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
            <Form.Item label="截止时间" name={"time"}>
                <DatePicker
                    placement="topLeft"
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                />
            </Form.Item>

            <Form.Item >
                <Button type="primary">提交</Button>
            </Form.Item>
        </Form>
    </div>
}