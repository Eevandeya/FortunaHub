import styles from './notice.module.css';

const Notification = ({ status, message }) => {
    switch (status) {
        case 'error':
            return (
                <div className={`${styles.notice} ${styles.error}`}>
                    {message}
                </div>
            );
        default:
            return undefined;
    }
};

export default Notification;
