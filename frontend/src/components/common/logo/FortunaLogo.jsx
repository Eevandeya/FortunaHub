import { ROUTES } from '@root.consts/navigation.js';
import { NavigationLink } from '@components.common/link/NavigationLink.jsx';
import styles from './logo.module.css';
import { useEffect, useRef } from 'react';

//eslint-disable-next-line
const FortunaLogo = ({ Logo }) => {
    const logoRef = useRef();

    useEffect(() => {
        const getScrollProgress = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;

            const scrollHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        };
        const onScroll = () => {
            const scroll = getScrollProgress();
            if (logoRef.current?.style) {
                logoRef.current.style.transform = `rotate(${scroll}deg)`;
            }

            requestAnimationFrame(onScroll);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <NavigationLink to={ROUTES.HOME}>
                <span className={styles.logo}>
                    F
                    <Logo
                        alt='Logo'
                        width='48'
                        height='48'
                        aria-label='Фортуна логотип'
                        className={styles.logo_image}
                        ref={logoRef}
                    />
                    RTUNA
                </span>
            </NavigationLink>
        </>
    );
};

export default FortunaLogo;
