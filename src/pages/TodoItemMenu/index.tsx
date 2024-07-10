import Icon from '@/components/Icon';
import { levels } from '@/constants/config';
import { Divider } from "antd";

export default function TodoItemMenu() {

    return <div className=' py-[10px] text-[14px] text-[#202020]'>
        <p className=' text-[12px] text-[#ccc] px-[10px]'>优先级</p>
        <ul className='flex px-[10px] justify-between'>
            {
                levels.map(level => <li key={level.level} className=' flex-1 text-center hover:bg-[#f1f4ff] rounded-sm'>
                    <Icon styles={{
                        color: level.color
                    }} classNames={`text-[20px] mr-[4px]`} name="icon-hongqi"></Icon>
                </li>)
            }
        </ul>
        <Divider className=' my-[4px]'></Divider>
        <ul className=' px-[4px]'>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-zhidingxian"></Icon>
                置顶</li>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-fangqi"></Icon>
                放弃</li>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-yidongdaowenjianjia"></Icon>
                移动到</li>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-xgl-tags4"></Icon>
                标签</li>
        </ul>
        <Divider className=' my-[4px]'></Divider>
        <ul className=' px-[4px]'>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-copy"></Icon>
                创建副本</li>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-gl-fileText"></Icon>
                打开便签</li>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-chulizhong"></Icon>
                转换为笔记</li>
            <li className='py-[2px] px-[4px] flex items-center hover:bg-[#f7f7f7] rounded-sm'>
                <Icon classNames={`text-[16px] mr-[4px]`} name="icon-shanchu"></Icon>
                删除</li>
        </ul>
    </div>
}