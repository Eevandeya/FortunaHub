import { useLayoutEffect } from 'react';
import styles from './main_layout.module.css';
import Button from '@components.common/button/Button.jsx';

const BurgerButton = ({ isActive, setIsActive }) => {
    useLayoutEffect(() => {
        const closeMenuOnResize = () => {
            if (window.innerWidth > 768 && isActive) {
                setIsActive(false);
            }
        };

        window.addEventListener('resize', closeMenuOnResize);
        return () => window.removeEventListener('resize', closeMenuOnResize);
    }, [isActive]);

    return (
        <button
            className={
                isActive ? `${styles.burger} ${styles.active}` : styles.burger
            }
            onClick={() => setIsActive(!isActive)}
        />
    );
};

export default BurgerButton;
