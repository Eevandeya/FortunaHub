import Button from './Button.jsx';
import styles from './button.module.css';

const GoToButton = ({ value, onClick, theme = 'white', isBordering }) => {
    return (
        <Button
            className={`${styles.go_to_button} ${theme === 'black' ? styles.black : styles.white} ${isBordering && styles.border}`}
            message={value}
            onClick={onClick}
        />
    );
};

export default GoToButton;
