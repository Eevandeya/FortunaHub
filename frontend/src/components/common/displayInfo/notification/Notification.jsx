import styles from './notice.module.css';
import Button from '@components.common/button/Button.jsx';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const Notification = ({ variant = 'info', message, onClose, ttl }) => {
    useEffect(() => {
        if (!message) {
            return;
        }
        const timerId = setTimeout(onClose, ttl);

        return () => clearTimeout(timerId);
    }, [message]);

    return createPortal(
        message && (
            <div className={`${styles.notice} ${styles[variant]}`}>
                <span>{message}</span>
                <Button
                    className={styles.close}
                    onClick={onClose}
                    aria-label='Close notification'
                    message=''
                />
            </div>
        ),
        document.body
    );
};

export default Notification;
