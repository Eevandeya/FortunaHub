import { useState } from 'react';
import { TimePicker } from '@components.features/timeBooking/TimePicker.jsx';
import DateSelector from '@components.common/datePicker/DatePicker.jsx';
import { startOfDay } from 'date-fns';
import { useSelector } from 'react-redux';
import { Sidebar } from '@components.layout/Sidebar.jsx';
import { TimeInfoCard } from '@components.common/displayInfo/TimeInfoCard.jsx';
import { GoodsInfoCard } from '@components.common/displayInfo/GoodsInfoCard.jsx';
import { StepsBar } from '@components.common/progressSteps/StepsBar.jsx';

const TimeBookingPage = () => {
    const [date, setDate] = useState(new Date());
    const { timeSlot } = useSelector((state) => state.booking.order);

    const paths = { previous: '/', next: '../goods' };
    const steps = [
        { number: 1, to: '/booking/time' },
        { number: 2, to: '/booking/goods' },
        { number: 3, to: '/booking/reservation' },
    ];

    return (
        <div className='booking-container'>
            <StepsBar steps={steps} />
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
            <Sidebar paths={paths}>
                <TimeInfoCard timeSlot={timeSlot} date={date} />
                <GoodsInfoCard items={[]} />
            </Sidebar>
        </div>
    );
};
export default TimeBookingPage;
