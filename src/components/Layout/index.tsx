
import { Outlet } from 'react-router-dom';
// import LeftMenu from './LeftMenu';

export default function Layout() {


    return <div className=' w-lvh h-lvh flex'>
        {/* <div className=' w-[72px] h-full pt-[20px] rounded-r-[5px] overflow-hidden'>
            <LeftMenu />
        </div> */}
        <span className=' flex-1 inline-block'>
            <Outlet />
        </span>
    </div>
}