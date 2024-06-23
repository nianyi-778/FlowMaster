
import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import Title from './Title';
import { useEffect } from 'react';
import useAutoTodo from '@/hooks/useAutoTodo';

export default function Layout() {
    const { asyncTodoData } = useAutoTodo();

    useEffect(() => {
        window.ipcRenderer.on("win-close-after", () => {
            console.log('win-close-after');
            asyncTodoData();
        });
    }, [asyncTodoData])

    return <div className=' w-lvh h-lvh '>
        <div className=' w-full h-[31px] bg-[#f8faff]' >
            <Title />
        </div>
        <div className=' flex-1 flex  h-[calc(100vh-31px)]'>
            <LeftMenu></LeftMenu>
            <div className=' w-[calc(100vw-56px)]'>
                <Outlet />
            </div>
        </div>
    </div>
}