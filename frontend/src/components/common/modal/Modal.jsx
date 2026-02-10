import styles from './modal.module.css';

const Modal = ({ closeModal, modalState, children }) => {
    const onClick = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            className={`${styles.modal_background} ${modalState && styles.active}`}
            onClick={closeModal}>
            <div
                className={`${styles.modal_window} ${modalState && styles.active}`}
                onClick={onClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
