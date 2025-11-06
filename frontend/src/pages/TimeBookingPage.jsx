import { useState } from 'react';
import { TimePicker } from '@components.features/timeBooking/TimePicker.jsx';
import DateSelector from '@components.common/datePicker/DatePicker.jsx';
import { startOfDay } from 'date-fns';

const TimeBookingPage = () => {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <div className='booking-main'>
                <div className='booking-header'>
                    <h1>Забронируйте баню</h1>
                </div>
                <div className='booking-content'>
                    <header>
                        <h3>Выберите дату</h3>
                    </header>
                    <DateSelector date={date} setDate={setDate} />
                </div>
                <div className='booking-content'>
                    <header>
                        <h3>Выберите время</h3>
                    </header>
                    <TimePicker date={startOfDay(date)} />
                </div>
            </div>
        </>
    );
};
export default TimeBookingPage;
