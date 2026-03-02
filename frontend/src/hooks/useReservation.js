import { useDispatch, useSelector } from 'react-redux';
import { setBookingStatus } from '@store/bookingSlice.js';
import { useCallback } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useGetSaunaConfigQuery } from '@root.api/saunaConfig.js';
import useBookingValidation from './useBookingValidation.js';
import { useSetBookingMutation } from '@root.api/bookingHandler.js';
import {
    setPreferredContactMethod,
    setUserInfo,
    setVisitorsCount,
} from '@store/userSlice.js';
import { selectBookingItems } from '../store/selectors/itemsSelectors.js';
import { selectBookingDateTime } from '../store/selectors/dateTimeSelectors.js';

export const useReservation = (
    { preferredContactMethod, visitorsCount },
    formState
) => {
    const dispatch = useDispatch();
    const timeSlot = useSelector(selectBookingDateTime);
    const items = useSelector(selectBookingItems);
    const { handleApiError } = useErrorHandler();
    const { data } = useGetSaunaConfigQuery();
    const { validationSteps: isFieldsValid } = useBookingValidation();
    const [reserve] = useSetBookingMutation();
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
