import { Outlet } from 'react-router-dom';
import MainNavbar from '@components.layout/navbar/main/MainNavbar.jsx';
import Basement from '../basement/Basement.jsx';

const MainLayout = () => {
    return (
        <>
            <MainNavbar />
            <Outlet />
            <Basement />
        </>
    );
};

export default MainLayout;
