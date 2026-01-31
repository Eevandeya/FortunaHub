import Button from './Button.jsx';
import styles from './button.module.css';

const SelectButton = ({ value, onClick }) => (
    <Button
        className={styles.select_button}
        message={value}
        onClick={onClick}
    />
);

export default SelectButton;
