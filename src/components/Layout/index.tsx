
import { Outlet } from 'react-router-dom';
// import LeftMenu from './LeftMenu';

export default function Layout() {


    return <div className=' w-lvh h-lvh flex'>
        <span className=' flex-1 inline-block'>
            <Outlet />
        </span>
    </div>
}