import { useDispatch } from 'react-redux';
import { setBookingStatus } from '@store/bookingSlice.js';
import { useCallback } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useGetSaunaConfigQuery } from '@root.api/saunaConfig.js';
import useBookingValidation from './useBookingValidation.js';
import {
    setPreferredContactMethod,
    setUserInfo,
    setVisitorsCount,
} from '@store/userSlice.js';

export const useReservation = (
    { preferredContactMethod, visitorsCount },
    formState
) => {
    const dispatch = useDispatch();
    const { handleApiError } = useErrorHandler();
    const { data } = useGetSaunaConfigQuery();
    const { validationSteps: isFieldsValid } = useBookingValidation();
    const config = (() => {
        if (!data) return undefined;
        return { maxVisitors: data.max_visitors_count };
    })();

    const setCustomerData = (userData) => {
        dispatch(setUserInfo({ customer: userData.customer }));
        dispatch(setVisitorsCount({ visitorsCount: userData.visitorsCount }));
        dispatch(
            setPreferredContactMethod({
                preferredContactMethod: userData.preferredContactMethod,
            })
        );
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

                const lastAttempt = new Date().toLocaleString();
                const status = 'valid';
                dispatch(setBookingStatus({ lastAttempt, status }));
                return status;
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
            preferredContactMethod,
            handleApiError,
        ]
    );

    return { submit, config };
};
