import { useState, useEffect, useCallback, useRef } from 'react';
import { getAvailableTimes } from '@root.api/timeSlotsApi.js';
import TimeUtils from '@root.utils/time_utils.js';
import useConfig from '@hooks/useConfig.js';
import { format } from 'date-fns';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useBooking } from '@hooks/useBooking';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback.js';

export function useAvailableTimes(selectedDate) {
    const [availableTime, setAvailableTime] = useState([]);
    const { handleHookError, handleApiError } = useErrorHandler();
    const [isLoading, setIsLoading] = useState(false);
    const prevData = useRef();

    const fetchTimes = useCallback(
        async (date) => {
            try {
                setIsLoading(true);
                if (!selectedDate) {
                    throw new Error(
                        'Не выбрана дата бронирования. Вернитесь и выберите дату'
                    );
                }
                const formatted_selected_date = format(date, 'yyyy-MM-dd');

                if (prevData.current === formatted_selected_date) {
                    setIsLoading(false);
                    return;
                }

                try {
                    const free_time = await getAvailableTimes(
                        formatted_selected_date
                    );
                    setAvailableTime(free_time);
                    prevData.current = formatted_selected_date;
                } catch (error) {
                    handleApiError(error, {
                        type: 'api_operation',
                        action: 'fetchTimes',
                    });
                }
            } catch (error) {
                handleHookError(error, 'useAvailableTimes');
            } finally {
                setIsLoading(false);
            }
        },
        [handleApiError, selectedDate]
    );

    const debouncedCallback = useDebouncedCallback(fetchTimes, 300);

    useEffect(() => {
        if (selectedDate) {
            debouncedCallback(selectedDate);
        } else {
            setAvailableTime([]);
        }
    }, [selectedDate, debouncedCallback]);

    useEffect(() => {
        return () => {
            debouncedCallback.cancel();
        };
    }, [debouncedCallback]);

    return [availableTime, isLoading];
}

export function useTimeSlot() {
    const { handleHookError } = useErrorHandler();
    const [isBooking, setIsBooking] = useState(false);
    const { config, error } = useConfig();
    const { setTimeSlot } = useBooking();

    const configRef = useRef(config);
    const handleHookErrorRef = useRef(handleHookError);
    const setTimeSlotRef = useRef(setTimeSlot);

    useEffect(() => {
        configRef.current = config;
        handleHookErrorRef.current = handleHookError;
        setTimeSlotRef.current = setTimeSlot;
    }, [config, handleHookError, setTimeSlot]);

    const bookTimeSlot = (start, end, selectedDate, availableTimes) => {
        try {
            if (!start || !end || !selectedDate) {
                throw new Error('Не выбрано время или дата');
            }

            const canBookingFromNow = TimeUtils.isBookingAvailable(
                start,
                configRef.current.min_time_from_now_to_booking
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

            const [startISOS, endISOS] = TimeUtils.formatToIsos([start, end]);

            setTimeSlot({ start: startISOS, end: endISOS });
            setIsBooking(true);
            return { success: undefined };
        } catch (error) {
            handleHookErrorRef.current(error, 'useTimeSlot');
            return { reject: undefined };
        }
    };

    return [bookTimeSlot, setIsBooking, isBooking];
}
