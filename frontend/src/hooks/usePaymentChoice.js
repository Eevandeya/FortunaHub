import {
    resetBookings,
    resetBookingStatus,
    selectStatus,
    setBookingStatus,
} from '../store/bookingSlice.js';
import { resetItems } from '../store/itemsSlice.js';
import { resetDateTime } from '../store/dateTimeSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';
import { useCallback, useEffect, useState } from 'react';
import { useSetBookingMutation } from '@root.api/bookingHandler.js';
import { useErrorHandler } from './useErrorHandler.js';

const usePaymentChoice = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const [reserve] = useSetBookingMutation();
    const { customer, items, timeSlot, visitorsCount, preferredContactMethod } =
        useSelector((state) => state.booking.order);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { handleApiError } = useErrorHandler();

    const resetAllData = useCallback(() => {
        dispatch(resetBookingStatus());
        dispatch(resetDateTime());
        dispatch(resetItems());
        dispatch(resetBookings());
    }, [dispatch]);

    const sendBookingData = useCallback(async () => {
        try {
            await reserve({
                customer,
                items,
                timeSlot,
                visitorsCount,
                preferredContactMethod,
            });
        } catch (error) {
            handleApiError(error, { at: 'sendBookingData' });
            const errorMessage =
                'Ошибка оформления брони. Пожалуйста повторите еще раз!';
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
    }, [
        customer,
        items,
        preferredContactMethod,
        reserve,
        timeSlot,
        visitorsCount,
    ]);

    useEffect(() => {
        if (status !== 'success') {
            return;
        }
        resetAllData();
        setLoading(true);
        setTimeout(() => {
            navigate(ROUTES.STATUS.SUCCESS);
            setLoading(false);
        }, 3000);
    }, [status]);

    return [status, loading, sendBookingData];
};

export default usePaymentChoice;
