import { useEffect, useMemo, useRef } from 'react';
import TimeUtils from '@root.utils/timeUtils.js';
import { format, isMatch } from 'date-fns';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
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
        selectedDate
            ? {
                  date:
                      typeof selectedDate === 'string' &&
                      isMatch(selectedDate, 'yyyy-MM-dd')
                          ? selectedDate
                          : format(selectedDate, 'yyyy-MM-dd'),
              }
            : skipToken,
        { pollingInterval: 300_000 }
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

            dispatch(
                setTime({
                    start: format(start, 'HH:mm:ss'),
                    end: format(end, 'HH:mm:ss'),
                })
            );

            return { type: 'success' };
        } catch (error) {
            handleHookErrorRef.current(error, 'useTimeSlot');
            return { type: 'rejected' };
        }
    };

    return [bookTimeSlot, config, isLoading];
}
