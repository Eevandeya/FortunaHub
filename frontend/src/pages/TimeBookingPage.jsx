import { useContext, useEffect, useRef, useState } from 'react';
import { TimePicker } from '@components.features/timeBooking/TimePicker.jsx';
import DateSelector from '@components.features/timeBooking/DatePicker.jsx';
import { startOfDay } from 'date-fns';
import { ErrorBookingContext } from '../context/Context.js';

const TimeBookingPage = () => {
    const [date, setDate] = useState(new Date());
    const { invalidStep } = useContext(ErrorBookingContext);
    const dateRef = useRef();
    const timeSlotsRef = useRef();

    useEffect(() => {
        if (!invalidStep || invalidStep.pageId !== 'time') return;

        const errorFields = Object.entries(invalidStep.fields)
            .filter(([, hasError]) => hasError)
            .map(([fieldId]) => fieldId);

        let el;
        switch (errorFields[0]) {
            case 'date':
                el = dateRef.current;
                break;
            case 'timeSlots':
                el = timeSlotsRef.current;
                break;
            default:
                return;
        }
        requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            window.scrollBy({ top: rect.bottom, behavior: 'smooth' });
        });
    }, [invalidStep]);

    return (
        <>
            <div className='booking-main'>
                <div className='booking-header-title'>
                    <h1>Забронируйте баню</h1>
                </div>
                <div className='booking-content' ref={dateRef}>
                    <header>
                        <h5>Выберите дату</h5>
                    </header>
                    <DateSelector
                        date={date}
                        setDate={setDate}
                        hasError={invalidStep.fields?.date}
                        error='Выберите необходимую дату брони'
                    />
                </div>
                <div className='booking-content' ref={timeSlotsRef}>
                    <header>
                        <h5>Выберите время</h5>
                    </header>
                    <TimePicker
                        date={startOfDay(date)}
                        hasError={invalidStep.fields?.timeSlots}
                        error='Выберите время брони'
                    />
                </div>
            </div>
        </>
    );
};
export default TimeBookingPage;
