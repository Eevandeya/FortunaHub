import { memo } from 'react';
import classes from './cell.module.css';

const Cell = memo(({ time, isDisabled, isSelected, setSelectedTime }) => {
    return (
        <button
            className={
                !isSelected
                    ? `${classes.cell}`
                    : `${classes.cell} ${classes.active}`
            }
            disabled={isDisabled}
            onClick={() => {
                setSelectedTime();
            }}>
            <span className={classes.cell_body}>
                <p className={classes.cell_text}>{time}</p>
            </span>
        </button>
    );
});

export default Cell;
