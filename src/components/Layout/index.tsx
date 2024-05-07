
import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import Title from './Title';

export default function Layout() {


    return <div className=' w-lvh h-lvh flex'>
        <LeftMenu></LeftMenu>
        <div className=' flex-1 flex flex-col'>
            <Title />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    </div>
}