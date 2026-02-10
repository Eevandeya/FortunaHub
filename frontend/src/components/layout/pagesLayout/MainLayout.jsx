import { Outlet } from 'react-router-dom';
import MainNavbar from '@components.layout/navbar/main/MainNavbar.jsx';
import Basement from '../basement/Basement.jsx';

//eslint-
const MainLayout = () => {
    return (
        <>
            <MainNavbar transparentNavbar />
            <Outlet />
            <Basement />
        </>
    );
};

export default MainLayout;
