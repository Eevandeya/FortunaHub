import { memo } from 'react';
import styles from './button.module.css';
import Button from './Button.jsx';

const TransparentButton = memo(({ value, onClick, disabled, ...props }) => (
    <Button
        onClick={onClick}
        aria-disabled={disabled}
        className={`${styles.button} ${props.className}`}
        message={value}
        {...props}
    />
));

export default TransparentButton;
