import { useState } from 'react';
import { Time } from '@components.features/TimeBookingPopup/Time.jsx';
import DateSelector from '@components.common/date_picker/DatePicker.jsx';
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
        { number: 3, to: '/booking/payment' },
    ];

    return (
        <div
            style={{
                backgroundColor: '#FDFAF0',
                display: 'grid',
                gridTemplateColumns: '5vw 65vw 30vw',
                position: 'relative',
                height: '300vh',
            }}>
            <StepsBar steps={steps} />
            <div>
                <h1
                    style={{
                        color: 'black',
                        fontSize: '48px',
                        fontWeight: 'medium',
                    }}>
                    Забронируйте баню
                </h1>
                <div className='first'>
                    <h2 style={{ fontSize: '32px' }}>Выберите дату</h2>
                    <div
                        style={{
                            marginBlock: '10px',
                            marginInline: '5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            maxWidth: '40vw',
                        }}>
                        <DateSelector date={date} setDate={setDate} />
                    </div>
                </div>
                <div className='second'>
                    <h2 style={{ fontSize: '32px' }}>Выберите время</h2>
                    <div
                        style={{
                            marginBlock: '10px',
                            marginInline: '5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            minWidth: '50vw',
                            minHeight: '50vh',
                            gap: '5px',
                        }}>
                        <Time date={startOfDay(date)} />
                    </div>
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
