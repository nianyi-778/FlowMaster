
import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import Title from './Title';

export default function Layout() {

    return <div className=' w-lvh h-lvh '>
        <div className=' w-full h-[28px]' >
            <Title />
        </div>
        <div className=' flex-1 flex  h-[calc(100vh-28px)]'>
            <LeftMenu></LeftMenu>
            <div className=' w-[calc(100vw-52px)]'>
                <Outlet />
            </div>
        </div>
    </div>
}