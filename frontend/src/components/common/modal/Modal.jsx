const Modal = ({ closeModal, children }) => {
    const onClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.66)',
                display: 'flex',
                position: 'absolute',
                top: '0',
                left: '0',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={closeModal}>
            <div
                style={{
                    width: '45%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    paddingInline: '10px',
                    paddingBlock: '30px',
                    display: 'flex',
                    gap: '2px',
                    flexDirection: 'column',
                }}
                onClick={onClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
