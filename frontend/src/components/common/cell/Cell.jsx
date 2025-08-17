import 'bulma/css/bulma.css';

const Cell = ({ time, isDisabled, isSelected, setSelectedTime }) => {
  return (
    <button
      className={isSelected ? 'button is-link ' : 'button is-info is-outlined'}
      disabled={isDisabled}
      onClick={() => {
        setSelectedTime();
      }}
    >
      <span>
        <p>{time}</p>
      </span>
    </button>
  );
};

export default Cell;
