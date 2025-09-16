import paymentMethods from '../../../../consts/PaymentMethods.js';
import CloseButton from '../../common/button/closeButton.jsx';
import { useSetBookingMutation } from '../../../../api/bookingHandler.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {resetBookings} from '../../../store/bookingSlice.js';

const OrderPayment = ({onClick}) => {

    const [reserve, { isLoading, error, isError }] = useSetBookingMutation();
    const {customer, items, timeSlot, visitors_count, preferred_contact_method} = useSelector((state) => state.booking.order)
    const dispatch = useDispatch();

    const makeReservation = async () => {

        await reserve({
            customer,
            items,
            timeSlot,
            visitors_count,
            preferred_contact_method,
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
            <CloseButton onClick={onClick}/>
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
            <button className='button is-submit' onClick={makeReservation}></button>
        </div>
    );
};
export default OrderPayment;
