import { useEffect, useMemo, useRef, useState } from 'react';
import TimeUtils from '@root.utils/timeUtils.js';
import { format } from 'date-fns';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { setTimeSlot } from '@store/bookingSlice.js';
import { useDispatch } from 'react-redux';
import { useGetSaunaConfigQuery } from '@root.api/saunaConfig.js';
import { useGetAvailableTimesQuery } from '@root.api/timeSlotsApi.js';
import { skipToken } from '@reduxjs/toolkit/query';
import { setTime } from '@store/dateTimeSlice.js';

export function useAvailableTimes(selectedDate) {
    const { handleHookError, handleApiError } = useErrorHandler();

    const {
        data: slots,
        isLoading,
        error,
    } = useGetAvailableTimesQuery(
        selectedDate ? { date: format(selectedDate, 'yyyy-MM-dd') } : skipToken,
        { pollingInterval: 300_000, refetchOnFocus: true }
    );

    useEffect(() => {
        if (error) {
            handleHookError(error, 'useAvailableTimes');
        }
    }, [handleApiError, selectedDate]);

    return [slots?.free_slots ?? [], isLoading];
}

export function useTimeSlot() {
    const { handleHookError } = useErrorHandler();
    const [isBooking, setIsBooking] = useState(false);
    const { data, isLoading } = useGetSaunaConfigQuery();
    const dispatch = useDispatch();
    const handleHookErrorRef = useRef(handleHookError);

    useEffect(() => {
        handleHookErrorRef.current = handleHookError;
    }, [handleHookError]);

    const config = useMemo(() => {
        if (!data) return undefined;
        return {
            openingTime: data.opening_time,
            closingTime: data.closing_time,
            minTimeForBooking: data.min_time_from_now_to_booking,
            minBookingTime: data.min_booking_time,
            minTimeBetweenBookings: data.min_time_between_bookings,
        };
    }, [data]);

    const bookTimeSlot = (start, end, selectedDate, availableTimes) => {
        try {
            if (!start || !end || !selectedDate) {
                throw new Error('Не выбрано время или дата');
            }
            const canBookingFromNow = TimeUtils.isBookingAvailable(
                start,

                config.minTimeForBooking
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

    return [bookTimeSlot, config, setIsBooking, isBooking, isLoading];
}
