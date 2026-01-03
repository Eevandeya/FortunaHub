import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { memo } from 'react';
import { startOfDay, addMonths } from 'date-fns';
import './calendar.css';

const DateSelector = memo(({ date, setDate }) => {
    return (
        <DatePicker
            selected={date}
            onChange={(date) => setDate(startOfDay(date))}
            inline
            fixedHeight
            dateFormat='dd.MM.yyyy'
            minDate={new Date()}
            maxDate={addMonths(new Date(), 12)}
            calendarClassName='calendar-container'
        />
    );
});

export default DateSelector;
