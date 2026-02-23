import ReservationForm from '@components.features/customerBooking/ReservationForm.jsx';
import PaymentModal from '@components.features/payment/PaymentModal.jsx';
import { useSelector } from 'react-redux';
import { selectStatus, selectStatusMessage } from '@store/bookingSlice.js';
import Notification from '@components.common/displayInfo/notification/Notification.jsx';
import { useState } from 'react';

const ReservationPage = () => {
    const bookingStatus = useSelector(selectStatus);
    const statusMessage = useSelector(selectStatusMessage);
    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            <div className='booking-main'>
                <div className='booking-content'>
                    {showNotification && (
                        <Notification
                            status={bookingStatus}
                            message={statusMessage}
                        />
                    )}
                    <ReservationForm
                        setShowNotification={setShowNotification}
                    />
                    <PaymentModal />
                </div>
            </div>
        </>
    );
};
export default ReservationPage;
