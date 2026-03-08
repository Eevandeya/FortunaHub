import ReservationForm from '@components.features/customerBooking/ReservationForm.jsx';
import PaymentModal from '@components.features/payment/PaymentModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectStatusMessage } from '@store/bookingSlice.js';
import Notification from '@components.common/displayInfo/notification/Notification.jsx';
import { setBookingStatusMessage } from '@store/bookingSlice.js';
import { useState } from 'react';

const ReservationPage = () => {
    const bookingStatus = useSelector(selectStatus);
    const statusMessage = useSelector(selectStatusMessage);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='booking-main'>
                <div className='booking-content'>
                    <Notification
                        variant={bookingStatus}
                        message={statusMessage}
                        onClose={() => dispatch(setBookingStatusMessage(''))}
                        ttl={4000}
                    />
                    <ReservationForm onPaymentOpen={() => setShowModal(true)} />
                    <PaymentModal
                        isModalOpen={showModal}
                        closeModal={() => setShowModal(false)}
                    />
                </div>
            </div>
        </>
    );
};
export default ReservationPage;
