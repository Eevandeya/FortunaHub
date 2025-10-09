import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { memo } from 'react';

const DateSelector = memo(({ date, setDate }) => {
    return <DatePicker selected={date} onChange={(date) => setDate(date)} />;
});

export default DateSelector;
