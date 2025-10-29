import ProductReservation from '@components.features/goodsBooking/ProductReservation.jsx';
import { useSelector } from 'react-redux';
import { TimeInfoCard } from '@components.common/displayInfo/TimeInfoCard.jsx';
import { GoodsInfoCard } from '@components.common/displayInfo/GoodsInfoCard.jsx';
import { Sidebar } from '@components.layout/Sidebar.jsx';
import { StepsBar } from '@components.common/progressSteps/StepsBar.jsx';

const GoodsBookingPage = () => {
    const { timeSlot, items } = useSelector((state) => state.booking.order);

    const paths = { previous: '../time', next: '../reservation' };
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
                    <h3>Выберите товары:</h3>
                </header>
                <div className='booking-content'>
                    <ProductReservation />
                </div>
            </div>
            <Sidebar paths={paths}>
                <TimeInfoCard timeSlot={timeSlot} date={timeSlot?.start} />
                <GoodsInfoCard items={items} />
            </Sidebar>
        </div>
    );
};
export default GoodsBookingPage;
