import { useContext, useEffect, useRef, useState } from 'react';
import { TimePicker } from '@components.features/timeBooking/TimePicker.jsx';
import DateSelector from '@components.features/timeBooking/DatePicker.jsx';
import { ErrorBookingContext } from '../context/Context.js';
import { useDispatch } from 'react-redux';
import { format, startOfDay } from 'date-fns';
import { setDate } from '../store/dateTimeSlice.js';

const TimeBookingPage = () => {
    const [calendarDate, setCalendarDate] = useState(new Date());
    const { invalidStep } = useContext(ErrorBookingContext);
    const dateRef = useRef();
    const timeSlotsRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!invalidStep.error || invalidStep.error.pageId !== 'time') return;

        let el;
        switch (invalidStep.error.place) {
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
                        date={calendarDate}
                        setDate={(newDate) => {
                            setCalendarDate(newDate);
                            dispatch(
                                setDate({ date: format(newDate, 'yyyy-MM-dd') })
                            );
                        }}
                        hasError={invalidStep.error?.place === 'date'}
                        error={invalidStep.error?.message}
                    />
                </div>
                <div className='booking-content' ref={timeSlotsRef}>
                    <header>
                        <h5>Выберите время</h5>
                    </header>
                    <TimePicker
                        date={startOfDay(calendarDate)}
                        hasError={invalidStep.error?.place === 'timeSlots'}
                        error={invalidStep.error?.message}
                    />
                </div>
            </div>
        </>
    );
};
export default TimeBookingPage;
