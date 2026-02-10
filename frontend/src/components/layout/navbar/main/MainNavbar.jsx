import Navbar from '@components.common/header/Navbar.jsx';
import MenuList from './MenuList.jsx';
import BurgerButton from './BurgerButton.jsx';
import { useEffect, useState } from 'react';
import { ROUTES } from '@root.consts/navigation.js';
import FortunaLogo from '@components.common/logo/FortunaLogo.jsx';
import { NavigationLink } from '@components.common/link/NavigationLink.jsx';
import { HashNavigationLink } from '@components.common/link/HashNavigationLink.jsx';
import styles from '../navbar.module.css';
import Logo from '@assets/icons/Fortuna 64x64.svg?react';
import useScrollNavigate from '../../../../hooks/useScrollNavigate.js';

const MainNavbar = ({ transparentNavbar }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const scroll = useScrollNavigate();

    useEffect(() => {
        if (!transparentNavbar) return;
        const target = document.getElementById('hero');

        if (!target) return;

        const observer = new IntersectionObserver((entries) => {
            setIsHeroVisible(entries[0].isIntersecting);
        });

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <Navbar isNavbarActive={isHeroVisible}>
            <div
                className={`${styles.main_navbar} ${(!isHeroVisible || !transparentNavbar) && styles.active}`}>
                <div className={styles.navbar_brand}>
                    <FortunaLogo logoHeader='FORTUNA' Logo={Logo} hasHeader />
                </div>
                <div className={styles.navbar_menu}>
                    <HashNavigationLink onClick={() => scroll('/', 'main')}>
                        В ГЛАВНОЕ МЕНЮ
                    </HashNavigationLink>
                    <NavigationLink to={ROUTES.BOOKING.TIME} end>
                        ЗАБРОНИРОВАТЬ
                    </NavigationLink>
                    <HashNavigationLink onClick={() => scroll('./', 'about')}>
                        О НАС
                    </HashNavigationLink>
                </div>
                <MenuList isMenuOpen={isMenuOpen}>
                    <div className={styles.menu_list}>
                        <div className={styles.menu_container}>
                            <HashNavigationLink
                                className={styles.menu_item}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    scroll('/', 'main');
                                }}>
                                Главная
                            </HashNavigationLink>
                        </div>
                        <div className={styles.menu_container}>
                            <NavigationLink
                                to={ROUTES.BOOKING.TIME}
                                className={styles.menu_item}>
                                Забронировать
                            </NavigationLink>
                        </div>
                        <div className={styles.menu_container}>
                            <HashNavigationLink
                                className={styles.menu_item}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    scroll('./', 'about');
                                }}>
                                О нас
                            </HashNavigationLink>
                        </div>
                    </div>
                </MenuList>
                <BurgerButton
                    isActive={isMenuOpen}
                    setIsActive={setIsMenuOpen}
                />
            </div>
        </Navbar>
    );
};

export default MainNavbar;
