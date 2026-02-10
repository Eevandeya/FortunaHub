import { useDispatch, useSelector } from 'react-redux';
import {
    selectStatus,
    selectStatusMessage,
    setBookingStatus,
    setCustomerInfo,
    setVisitorsCount,
} from '@store/bookingSlice.js';

import { useCallback } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useGetSaunaConfigQuery } from '../../api/saunaConfig.js';
import useBookingValidation from './useBookingValidation.js';

export const useReservation = (preferredContactMethod, visitors, formState) => {
    const dispatch = useDispatch();
    const { items, timeSlot } = useSelector((state) => state.booking.order);
    const status = useSelector(selectStatus);
    const statusMessage = useSelector(selectStatusMessage);
    const { handleApiError } = useErrorHandler();
    const { data: config } = useGetSaunaConfigQuery();
    const { validationSteps: isFieldsValid } = useBookingValidation();

    const setCustomer = (data) => {
        dispatch(setCustomerInfo({ customer: data }));
    };

    const setVisitors = (data) => {
        dispatch(setVisitorsCount({ visitorsCount: data }));
    };

    const submitReservation = useCallback(
        (data) => {
            if (
                formState.isValid &&
                Object.values(isFieldsValid).every((field) => field.valid)
            ) {
                try {
                    const customerData = {
                        nickname: data.nickname,
                        phoneNumber: data.phoneNumber,
                    };

                    setCustomer(customerData);
                    setVisitors(visitors);
                    const successMessage = 'Data reserved';
                    const lastAttempt = new Date().toLocaleString();
                    const status = 'draft';
                    dispatch(
                        setBookingStatus({
                            statusMessage: successMessage,
                            lastAttempt,
                            status,
                        })
                    );
                } catch (error) {
                    handleApiError(error, { at: 'submitReservation' });
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
                    return;
                }
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
            visitors,
            items,
            timeSlot,
            preferredContactMethod,
            handleApiError,
        ]
    );

    return { reserve: submitReservation, status, statusMessage, config };
};
