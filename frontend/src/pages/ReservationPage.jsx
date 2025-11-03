import ReservationForm from '@components.features/customerBooking/ReservationForm.jsx';
import { useSelector } from 'react-redux';
import { Sidebar } from '@components.layout/Sidebar.jsx';
import { TimeInfoCard } from '@components.common/displayInfo/TimeInfoCard.jsx';
import { GoodsInfoCard } from '@components.common/displayInfo/GoodsInfoCard.jsx';
import { StepsBar } from '../components/common/progressSteps/StepsBar.jsx';

const ReservationPage = () => {
    const { timeSlot, items } = useSelector((state) => state.booking.order);

    const paths = { previous: '../goods', next: '' };
    const steps = [
        { number: 1, to: '/booking/time' },
        { number: 2, to: '/booking/goods' },
        { number: 3, to: '/booking/reservation' },
    ];

    return (
        <div className='booking-container'>
            <StepsBar steps={steps} />
            <div className='booking-main'>
                <header>
                    <h3>Введите персональные данные:</h3>
                </header>
                <div className='booking-content'>
                    <ReservationForm />
                </div>
            </div>
            <Sidebar paths={paths}>
                <TimeInfoCard timeSlot={timeSlot} date={timeSlot?.start} />
                <GoodsInfoCard items={items} />
            </Sidebar>
        </div>
    );
};
export default ReservationPage;
