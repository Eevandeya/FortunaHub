import { useState, useEffect } from 'react';
import { getAvailableTimes, setTime } from '../../api/timeSlotsApi.js';
import { useFetching } from './useFetching.js';
import TimeUtils from '../../utils/time_utils.js';
import useConfig from './useConfig.js';
import { parse } from 'date-fns';

export function useAvailableTimes(selectedDate) {
  const [availableTime, setAvailableTime] = useState([]);
  const [fetching, isLoading, error] = useFetching(fetchTimes);

  async function fetchTimes() {
    if (!selectedDate) {
      throw new Error(
        'Не выбрана дата бронирования. Вернитесь и выберите дату'
      );
    }
    if (isNaN(Date.parse(selectedDate))) {
      throw new Error('Неверный формат даты.');
    }
    const free_time = await getAvailableTimes(selectedDate);
    setAvailableTime(free_time);

    try {
      const free_time = await getAvailableTimes(selectedDate);
      setAvailableTime(free_time);
    } catch (error) {
      throw new Error(error?.message);
    }
  }
  useEffect(() => {
    fetching();
  }, [selectedDate]);

  return [availableTime, isLoading, error];
}

export function useTimeSlot() {
  const [bookingError, setBookingError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const { config, error } = useConfig();

  const bookTimeSlot = async (
    startTime,
    endTime,
    selectedDate,
    availableTimes
  ) => {
    try {
      if (!startTime || !endTime || !selectedDate) {
        throw new Error('Не выбрано время или дата');
      }
      const parsed_selected_date = parse(
        selectedDate,
        'yyyy-MM-dd',
        new Date()
      );
      const start = parse(startTime, 'HH:mm', parsed_selected_date);
      const end = parse(endTime, 'HH:mm', parsed_selected_date);

      const canBookingFromNow = TimeUtils.isBookingAvailable(
        start,
        config.min_time_from_now_to_booking
      );

      if (!canBookingFromNow) throw new Error('Нельзя выбрать прошедшее время');

      const isAvailable = TimeUtils.isTimeSlotAvailable(
        availableTimes,
        { start, end },
        selectedDate
      );
      if (!isAvailable) {
        throw new Error('Выбранное время уже занято');
      }

      await setTime(selectedDate, { start: startTime, end: endTime })
        .then(() => setIsBooking(true))
        .catch((error) => {
          console.error(`An unexpected error has occured: ${error.message}`);
          setBookingError(error.message);
          setIsBooking(false);
        });
    } catch (error) {
      setBookingError(error.message);
      setIsBooking(false);
    }
  };

  return [bookTimeSlot, isBooking, bookingError];
}
