import { selectStatus } from '@store/bookingSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler.js';
import { useSetBookingMutation } from '@root.api/bookingHandler.js';
import { selectBookingData } from '@store/selectors/bookingSelectors.js';
import { setBookingStatus } from '@store/bookingSlice.js';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';

const useCreateBooking = () => {
    const dispatch = useDispatch();
    const [reserve, meta] = useSetBookingMutation();
    const bookingData = useSelector(selectBookingData);
    const status = useSelector(selectStatus);
    const navigate = useNavigate();

    //eslint-disable-next-line
    const { handleApiError } = useErrorHandler();

    const sendBookingData = async (bookingData) => {
        try {
            return await reserve(bookingData).unwrap();
        } catch (error) {
            return new Error(error);
        }
    };

    const createBooking = useCallback(
        async (paymentMethod) => {
            if (status !== 'valid' || meta.isLoading) {
                return;
            }
            try {
                const response = await sendBookingData({
                    ...bookingData,
                    paymentMethod,
                });
                if (paymentMethod === 'offline') {
                    navigate(
                        `${ROUTES.BOOKING.STATUS}/${response?.uuid}/manager`
                    );
                } else {
                    window.location.assign(response['payment-url']);
                }
            } catch (error) {
                const errorMessage = error.message;
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

    return [status, meta.isLoading, createBooking];
};

export default useCreateBooking;
