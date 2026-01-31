import styles from './main_layout.module.css';

const MenuList = ({ isMenuOpen, children }) => {
    return (
        <article
            className={
                isMenuOpen ? `${styles.menu} ${styles.active}` : styles.menu
            }>
            {children}
        </article>
    );
};

export default MenuList;
