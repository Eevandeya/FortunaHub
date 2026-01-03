import { memo } from 'react';
import styles from './buttons-styles.module.css';

const TransparentButton = memo(({ children, onClick, disabled, ...props }) => (
    <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${props.className} ${styles.is_ghost}`}>
        {children}
    </button>
));

export default TransparentButton;
