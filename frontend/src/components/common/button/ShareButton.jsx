import Button from './Button.jsx';
import styles from './button.module.css';

const ShareButton = ({ url, title, text }) => {
    const handleShare = async () => {
        if (!navigator.share || !url) {
            return;
        }

        try {
            await navigator.share({ url, text, title });
        } catch {
            //empty
        }
    };

    return <Button className={styles.share_button} onClick={handleShare} />;
};

export default ShareButton;
