import { ROUTES } from '@root.consts/navigation.js';
import { NavigationLink } from '@components.common/link/NavigationLink.jsx';
import FortunaLogo from '@components.common/logo/FortunaLogo.jsx';
import Navbar from '@components.common/header/Navbar.jsx';
import styles from './navbar.module.css';
import Logo from '@assets/icons/Fortuna 64x64.svg?react';

const BookingNavbar = () => {
    return (
        <Navbar>
            <div className={styles.booking_navbar}>
                <div className={styles.navbar_brand}>
                    <FortunaLogo
                        logoHeader='FORTUNA'
                        Logo={Logo}
                        hasHeader
                        id='booking-header'
                    />
                </div>
                <div className={styles.navbar_left}>
                    <NavigationLink id='to-main' to={ROUTES.HOME} end>
                        На главную
                    </NavigationLink>
                </div>
            </div>
        </Navbar>
    );
};

export default BookingNavbar;
