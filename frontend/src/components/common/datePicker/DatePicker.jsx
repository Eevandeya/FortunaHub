import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { memo } from 'react';
import { startOfDay } from 'date-fns';

const DateSelector = memo(({ date, setDate }) => {
    return (
        <DatePicker
            selected={date}
            onChange={(date) => setDate(startOfDay(date))}
            inline
            dateFormat='dd.MM.yyyy'
            minDate={new Date()}
        />
    );
});

export default DateSelector;
