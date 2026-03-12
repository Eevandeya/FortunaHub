import { selectStatus } from '@store/bookingSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler.js';
import { useSetBookingMutation } from '@root.api/bookingHandler.js';
import { selectBookingData } from '@store/selectors/bookingSelectors.js';
import { setBookingStatus } from '@store/bookingSlice.js';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';

const useCreateBooking = () => {
    const dispatch = useDispatch();
    const [reserve, meta] = useSetBookingMutation();
    const bookingData = useSelector(selectBookingData);
    const status = useSelector(selectStatus);
    const navigate = useNavigate();

    //eslint-disable-next-line
    const { handleApiError } = useErrorHandler();

    const submitBooking = async (bookingData) => {
        return await reserve(bookingData).unwrap();
    };

    const handleBookingRedirect = (paymentMethod, response) => {
        if (paymentMethod === 'offline') {
            navigate(
                generatePath(ROUTES.BOOKING.STATUS.UNPAID, {
                    orderNumber: response.orderNumber,
                })
            );
        } else {
            window.location.assign(response['payment-url']);
        }
    };

    const handleBookingSubmission = useCallback(
        async (paymentMethod) => {
            if (meta.isLoading) {
                return;
            }
            try {
                const response = await submitBooking({
                    ...bookingData,
                    paymentMethod,
                });
                handleBookingRedirect(paymentMethod, response);
            } catch (error) {
                const errorMessage = error.data?.message;
                const lastAttempt = new Date().toLocaleString();
                const status = 'error';
                dispatch(
                    setBookingStatus({
                        statusMessage: errorMessage,
                        lastAttempt,
                        status,
                    })
                );
            }
        },
        [bookingData, meta.isLoading, status]
    );

    return [status, meta.isLoading, handleBookingSubmission];
};

export default useCreateBooking;
