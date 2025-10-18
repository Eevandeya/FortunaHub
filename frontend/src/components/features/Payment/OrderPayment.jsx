import paymentMethods from '../../../../consts/PaymentMethods.js';
import CloseButton from '../../common/button/closeButton.jsx';
import { useSetBookingMutation } from '../../../../api/bookingHandler.js';
import { useDispatch, useSelector } from 'react-redux';
import { resetBookings } from '../../../store/bookingSlice.js';

const OrderPayment = ({ onClick }) => {
    const [reserve] = useSetBookingMutation();
    const { customer, items, timeSlot, visitorsCount, preferredContactMethod } =
        useSelector((state) => state.booking.order);
    const dispatch = useDispatch();

    const makeReservation = async () => {
        await reserve({
            customer,
            items,
            timeSlot,
            visitorsCount,
            preferredContactMethod,
        });
        dispatch(resetBookings());
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
            }}>
            <CloseButton onClick={onClick} />
            <ul>
                {paymentMethods.map((method) => (
                    <li key={method.id}>
                        <div
                            style={{
                                backgroundColor: 'gray',
                                width: '50vh',
                                color: 'white',
                            }}>
                            {method.text}
                        </div>
                    </li>
                ))}
            </ul>
            <button
                className='button is-submit'
                onClick={makeReservation}></button>
        </div>
    );
};
export default OrderPayment;
