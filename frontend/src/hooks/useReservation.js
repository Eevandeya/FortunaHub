import { useDispatch, useSelector } from 'react-redux';
import {
    resetBookings,
    setCustomerInfo,
    setVisitorsCount,
    setBookingStatus,
    selectStatus,
    selectStatusMessage,
} from '@store/bookingSlice.js';

import { useCallback } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useSetBookingMutation } from '@root.api/bookingHandler.js';
import { resetItems } from '@store/itemsSlice.js';
import { resetDateTime } from '@store/dateTimeSlice.js';

export const useReservation = (preferredContactMethod, visitors, formState) => {
    const dispatch = useDispatch();
    const [reserve] = useSetBookingMutation();
    const { items, timeSlot } = useSelector((state) => state.booking.order);
    const status = useSelector(selectStatus);
    const statusMessage = useSelector(selectStatusMessage);
    const { handleApiError } = useErrorHandler();

    const isFieldsValid = () => {
        const isTime = timeSlot?.start && timeSlot?.end;
        const isItems = Array.isArray(items);
        return isTime && isItems;
    };

    const setCustomer = (data) => {
        dispatch(setCustomerInfo({ customer: data }));
    };

    const setVisitors = (data) => {
        dispatch(setVisitorsCount({ visitorsCount: data }));
    };

    const bookingSubmitHandler = useCallback(
        async (data) => {
            if (formState.isValid && isFieldsValid()) {
                try {
                    const customerData = {
                        nickname: data.nickname,
                        phoneNumber: data.phoneNumber,
                    };

                    setCustomer(customerData);
                    setVisitors(visitors);

                    await reserve({
                        customer: customerData,
                        items,
                        timeSlot,
                        visitorsCount: visitors,
                        preferredContactMethod,
                    });

                    dispatch(resetDateTime());
                    dispatch(resetItems());
                    dispatch(resetBookings());
                } catch (error) {
                    handleApiError(error, { at: 'BookingConfirm' });
                    const errorMessage =
                        'Ошибка оформелния брони. Пожалйста повторите еще раз!';
                    const lastAttempt = new Date().toLocaleString();
                    const status = 'error';
                    dispatch(
                        setBookingStatus({
                            statusMessage: errorMessage,
                            lastAttempt,
                            status,
                        })
                    );
                    return;
                }
            } else {
                const errorMessage =
                    'Ошибка оформелния брони. Проверьте, правильно ли вы заполнили данные брони!';
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
        [
            formState.isValid,
            dispatch,
            setCustomer,
            setVisitors,
            visitors,
            reserve,
            items,
            timeSlot,
            preferredContactMethod,
            handleApiError,
        ]
    );

    return { reserve: bookingSubmitHandler, status, statusMessage };
};
