const Button = ({ onClick, type, message, name, disabled }) => {
    return (
        <button onClick={onClick} type={type} name={name} disabled={disabled}>
            {message}
        </button>
    );
};

export default Button;
