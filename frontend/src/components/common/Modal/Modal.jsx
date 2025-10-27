import './modal-wind.css';

const Modal = ({ active, setActive, children }) => {
    return (
        <>
            <div
                className={active ? 'modal active' : 'modal'}
                onClick={() => setActive()}>
                <div
                    className={
                        active ? 'modal-content active' : 'modal-content'
                    }
                    onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
