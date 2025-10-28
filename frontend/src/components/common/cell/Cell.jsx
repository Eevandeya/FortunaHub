import { memo } from 'react';
import classes from '@components.common/button/buttons-styles.module.css';

const Cell = memo(({ time, isDisabled, isSelected, setSelectedTime }) => {
    return (
        <button
            className={
                !isSelected
                    ? `${classes.button}`
                    : `${classes.button} ${classes.is_link}`
            }
            disabled={isDisabled}
            onClick={() => {
                setSelectedTime();
            }}>
            <span>
                <p>{time}</p>
            </span>
        </button>
    );
});

export default Cell;
