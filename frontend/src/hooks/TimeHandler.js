import { useState, useEffect } from 'react';
import { getAvailableTimes, setTime } from '../../api/timeSlotsApi.js';
import { useFetching } from './useFetching.js';
import TimeUtils from '../../utils/time_utils.js';
import useConfig from './useConfig.js';
import { parse } from 'date-fns';
import { useErrorHandler } from './useErrorHandler.js';

export function useAvailableTimes(selectedDate) {
  const [availableTime, setAvailableTime] = useState([]);
  const [fetching, isLoading] = useFetching(fetchTimes);
  const {handleHookError, handleApiError} = useErrorHandler()

  async function fetchTimes() {
    try{
      if (!selectedDate) {
        throw new Error(
          'Не выбрана дата бронирования. Вернитесь и выберите дату'
        );
      }
      if (isNaN(Date.parse(selectedDate))) {
        throw new Error('Неверный формат даты.');
      }
    } catch(error) {
      handleHookError(error, "useAvailableTimes")
    }

    try {
      const free_time = await getAvailableTimes(selectedDate);
      setAvailableTime(free_time);
    } catch (error) {
      handleApiError(error, {type : "api_operation", action : "fetchTimes"})
    }
  }
  useEffect(() => {
    if(selectedDate) {
      fetching();
    }
  }, [selectedDate]);

  return [availableTime, isLoading];
}

export function useTimeSlot() {

  const {handleHookError, handleApiError} = useErrorHandler()
  const [isBooking, setIsBooking] = useState(false);
  const config = useConfig();

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
      } catch (error) {
        handleHookError(error, "useTimeSlot")
        setIsBooking(false);
      }
      try {
        await setTime(selectedDate, { start: startTime, end: endTime })
        setIsBooking(true)
      } catch(error) {
          handleApiError(error, { type: "api_operation", action: "setTime" })
          setIsBooking(false);
      }
  };

  return [bookTimeSlot, isBooking];
}
