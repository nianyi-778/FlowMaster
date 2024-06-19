
import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import Title from './Title';

export default function Layout() {

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