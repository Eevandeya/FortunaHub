import {
    resetBookings,
    resetBookingStatus,
    selectStatus,
} from '../store/bookingSlice.js';
import { resetItems } from '../store/itemsSlice.js';
import { resetDateTime } from '../store/dateTimeSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';
import { useCallback, useState } from 'react';
import { useSetBookingMutation } from '@root.api/bookingHandler.js';

const usePaymentChoice = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const [reserve] = useSetBookingMutation();
    const { customer, items, timeSlot, visitorsCount, preferredContactMethod } =
        useSelector((state) => state.booking.order);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const resetAllData = useCallback(() => {
        dispatch(resetBookingStatus());
        dispatch(resetDateTime());
        dispatch(resetItems());
        dispatch(resetBookings());
    }, [dispatch]);

    const orderPay = useCallback(async () => {
        await reserve({
            customer,
            items,
            timeSlot,
            visitorsCount,
            preferredContactMethod,
        });
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

    return [status, loading, orderPay];
};

export default usePaymentChoice;
