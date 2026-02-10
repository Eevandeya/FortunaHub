import { Outlet } from 'react-router-dom';
import Basement from '../basement/Basement.jsx';
import MainNavbar from '../navbar/main/MainNavbar.jsx';

const DefaultLayout = () => (
    <>
        <MainNavbar />
        <Outlet />
        <Basement />
    </>
);

export default DefaultLayout;
