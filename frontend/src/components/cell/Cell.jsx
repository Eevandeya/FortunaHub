import 'bulma/css/bulma.css';
import { useState } from 'react';

const Cell = ({ time, isDisabled, setChosenTime }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      className={isClicked ? 'button is-link ' : 'button is-info is-outlined'}
      disabled={isDisabled}
      onClick={() => {
        setChosenTime(time);
        setIsClicked(!isClicked);
      }}
    >
      <span>
        <p>{time}</p>
      </span>
    </button>
  );
};

export default Cell;
