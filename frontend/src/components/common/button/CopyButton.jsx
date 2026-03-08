import Button from './Button.jsx';
const CopyButton = ({ copyData }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyData);
        } catch {
            console.error('Не удалось скопировать');
        }
    };

    return (
        <span className={styles.copy_wrapper}>
            <Button
                onClick={handleCopy}
                name='copy'
                className={styles.copy_button}
            />
        </span>
    );
};

import styles from './button.module.css';

export default CopyButton;
