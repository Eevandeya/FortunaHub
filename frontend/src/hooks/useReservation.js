import { useDispatch, useSelector } from 'react-redux';
import {
    setBookingStatus,
    setCustomerInfo,
    setPreferredContactMethod,
    setVisitorsCount,
} from '@store/bookingSlice.js';

import { useCallback, useMemo } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useGetSaunaConfigQuery } from '../../api/saunaConfig.js';
import useBookingValidation from './useBookingValidation.js';
import { useSetBookingMutation } from '../../api/bookingHandler.js';

export const useReservation = (
    { preferredContactMethod, visitorsCount },
    formState
) => {
    const dispatch = useDispatch();
    const { items, timeSlot } = useSelector((state) => state.booking.order);
    const { handleApiError } = useErrorHandler();
    const { data } = useGetSaunaConfigQuery();
    const { validationSteps: isFieldsValid } = useBookingValidation();
    const [reserve] = useSetBookingMutation();
    const config = useMemo(() => {
        if (!data) return undefined;
        return { maxVisitors: data.max_visitors_count };
    }, [data]);

    const setCustomerData = (userData) => {
        dispatch(setCustomerInfo({ customer: userData.customer }));
        dispatch(setVisitorsCount({ visitorsCount: userData.visitorsCount }));
        dispatch(
            setPreferredContactMethod({
                preferredContactMethod: userData.preferredContactMethod,
            })
        );
    };

    const sendBookingData = async (bookingData) => {
        try {
            return await reserve(bookingData);
        } catch (error) {
            return new Error(error);
        }
    };

    const submit = useCallback(
        (customer) => {
            if (
                formState.isValid &&
                Object.values(isFieldsValid).every((field) => field.isValid)
            ) {
                setCustomerData({
                    customer,
                    preferredContactMethod,
                    visitorsCount,
                });
                sendBookingData({
                    customer,
                    items,
                    timeSlot,
                    preferredContactMethod,
                    visitorsCount,
                });
            } else {
                const errorMessage =
                    'Ошибка оформления брони. Проверьте, правильно ли вы заполнили данные брони!';
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
            visitorsCount,
            items,
            timeSlot,
            preferredContactMethod,
            handleApiError,
        ]
    );

    return { submit, config };
};
