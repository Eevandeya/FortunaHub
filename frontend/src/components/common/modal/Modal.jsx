import './modal.css';

const Modal = ({ closeModal, modalState, children }) => {
    const onClick = (e) => {
        e.stopPropagation();
    };
    return (
        <div
            className={
                modalState
                    ? 'modal-background modal-active'
                    : 'modal-background'
            }
            onClick={closeModal}>
            <div
                className={modalState ? 'modal-window active' : 'modal-window'}
                onClick={onClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
