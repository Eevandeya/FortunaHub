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
import { useCallback, useState } from 'react';
import { useErrorHandler } from './useErrorHandler.js';

const usePaymentChoice = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //eslint-disable-next-line
    const { handleApiError } = useErrorHandler();

    const resetAllData = useCallback(() => {
        dispatch(resetBookingStatus());
        dispatch(resetDateTime());
        dispatch(resetItems());
        dispatch(resetBookings());
    }, [dispatch]);

    const pay = useCallback(() => {
        if (status !== 'draft' || loading) {
            return;
        }
        const lastAttempt = new Date().toLocaleString();
        dispatch(setBookingStatus({ lastAttempt, status: 'success' }));

        setLoading(true);
        setTimeout(() => {
            navigate(ROUTES.STATUS.SUCCESS);
            resetAllData();
            setLoading(false);
        }, 3000);
    }, [status]);

    return [status, loading, pay];
};

export default usePaymentChoice;
