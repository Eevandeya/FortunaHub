import BookingConfirm from '@components.features/BookingPopup/BookingConfirm.jsx';
import { useSelector } from 'react-redux';
import { Sidebar } from '@components.layout/Sidebar.jsx';
import { TimeInfoCard } from '@components.common/displayInfo/TimeInfoCard.jsx';
import { GoodsInfoCard } from '@components.common/displayInfo/GoodsInfoCard.jsx';
import { StepsBar } from '../components/common/progressSteps/StepsBar.jsx';

const PaymentPage = () => {
    const { timeSlot, items } = useSelector((state) => state.booking.order);

    const paths = { previous: '../goods', next: '' };
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
                <div>
                    <h2 style={{ fontSize: '32px' }}>
                        Введите персональные данные:
                    </h2>
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
                        <BookingConfirm />
                    </div>
                </div>
            </div>
            <Sidebar paths={paths}>
                <TimeInfoCard timeSlot={timeSlot} date={timeSlot?.start} />
                <GoodsInfoCard items={items} />
            </Sidebar>
        </div>
    );
};
export default PaymentPage;
