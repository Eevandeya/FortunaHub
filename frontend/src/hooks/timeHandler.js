import { useCallback, useEffect, useRef, useState } from 'react';
import TimeUtils from '@root.utils/timeUtils.js';
import { format } from 'date-fns';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { setTimeSlot } from '@store/bookingSlice.js';
import { useDispatch } from 'react-redux';
import { useGetSaunaConfigQuery } from '../../api/saunaConfig.js';
import { useGetAvailableTimesQuery } from '../../api/timeSlotsApi.js';
import { skipToken } from '@reduxjs/toolkit/query';

export function useAvailableTimes(selectedDate) {
    const [freeSlots, setFreeSlots] = useState([]);
    const { handleHookError, handleApiError } = useErrorHandler();
    const { data: slots, isLoading } = useGetAvailableTimesQuery({
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : skipToken,
    });

    const fetchTimes = useCallback(() => {
        try {
            if (!selectedDate) {
                throw new Error(
                    'Не выбрана дата бронирования. Вернитесь и выберите дату'
                );
            }
            setFreeSlots(slots.free_slots);
        } catch (error) {
            handleHookError(error, 'useAvailableTimes');
        }
    }, [handleApiError, selectedDate]);

    useEffect(() => {
        if (selectedDate && slots) {
            fetchTimes(selectedDate);
        }
    }, [selectedDate, slots]);

    return [freeSlots, isLoading];
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
                config?.min_time_from_now_to_booking
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

            const [startISOS, endISOS] = TimeUtils.formatToIso([start, end]);
            const timeSlot = { start: startISOS, end: endISOS };

            dispatch(setTimeSlot({ timeSlot }));
            setIsBooking(true);
            return { success: undefined };
        } catch (error) {
            handleHookErrorRef.current(error, 'useTimeSlot');
            return { reject: undefined };
        }
    };

    return [bookTimeSlot, setIsBooking, isBooking, isLoading];
}
