import { useEffect, useRef, useState } from 'react';
import TimeUtils from '@root.utils/timeUtils.js';
import { format } from 'date-fns';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { setTimeSlot } from '@store/bookingSlice.js';
import { useDispatch } from 'react-redux';
import { useGetSaunaConfigQuery } from '@root.api/saunaConfig.js';
import { useGetAvailableTimesQuery } from '@root.api/timeSlotsApi.js';
import { skipToken } from '@reduxjs/toolkit/query';
import { setDate, setTime } from '@store/dateTimeSlice.js';

export function useAvailableTimes(selectedDate) {
    const { handleHookError, handleApiError } = useErrorHandler();
    const {
        data: slots,
        isLoading,
        error,
    } = useGetAvailableTimesQuery({
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : skipToken,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            handleHookError(error, 'useAvailableTimes');
        }
    }, [handleApiError, selectedDate]);

    useEffect(() => {
        if (selectedDate) {
            dispatch(setDate({ date: format(selectedDate, 'yyyy-MM-dd') }));
        }
    }, [selectedDate, slots]);

    return [slots?.free_slots ?? [], isLoading];
}

export function useTimeSlot() {
    const { handleHookError } = useErrorHandler();
    const [isBooking, setIsBooking] = useState(false);
    const { data: config, isLoading } = useGetSaunaConfigQuery();
    const dispatch = useDispatch();

    const handleHookErrorRef = useRef(handleHookError);

    useEffect(() => {
        handleHookErrorRef.current = handleHookError;
    }, [handleHookError]);

    const bookTimeSlot = (start, end, selectedDate, availableTimes) => {
        try {
            if (!start || !end || !selectedDate) {
                throw new Error('Не выбрано время или дата');
            }
            const canBookingFromNow = TimeUtils.isBookingAvailable(
                start,

                config.min_time_from_now_to_booking
            );

            if (!canBookingFromNow)
                throw new Error('Нельзя выбрать прошедшее время');

            const isAvailable = TimeUtils.isTimeSlotAvailable(
                availableTimes,
                { start, end },
                selectedDate
            );
            if (!isAvailable) {
                throw new Error('Выбранное время уже занято');
            }

            const [startISO, endISO] = TimeUtils.formatToIso([start, end]);
            const timeSlot = { start: startISO, end: endISO };

            dispatch(setTimeSlot({ timeSlot }));
            dispatch(
                setTime({
                    start: timeSlot.start.split('T')[1],
                    end: timeSlot.end.split('T')[1],
                })
            );
            setIsBooking(true);
            return { success: undefined };
        } catch (error) {
            handleHookErrorRef.current(error, 'useTimeSlot');
            return { reject: undefined };
        }
    };

    return [bookTimeSlot, setIsBooking, isBooking, isLoading];
}
