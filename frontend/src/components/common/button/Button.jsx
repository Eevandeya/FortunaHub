import styles from './button.module.css';

const Button = ({
    onClick,
    type = 'button',
    message,
    name,
    tabIndex = '0',
    ...other
}) => {
    return (
        <button
            {...other}
            className={`${styles.button} ${other.className}`}
            onClick={onClick}
            type={type}
            name={name}
            tabIndex={tabIndex}>
            {message}
        </button>
    );
};

export default Button;
