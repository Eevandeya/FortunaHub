import { useState, useEffect } from 'react';
import { getAvailableTimes, setTime } from '../api/timeSlotsApi.js';
import { useFetching } from './useFetching.js';

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
  }

  useEffect(() => {
    fetching();
  }, [selectedDate]);

  return [availableTime, isLoading, error];
}

export function useTimeSlot() {
  const [bookingError, setBookingError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

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
      let start = new Date(`${selectedDate}T${startTime}`);
      let end = new Date(`${selectedDate}T${endTime}`);
      let now = new Date();

      if (start > end) {
        if (
          end.toLocaleTimeString('ru-RS', {
            hour: '2-digit',
            minute: '2-digit',
          }) === '00:00'
        ) {
          end.setHours(24);
        } else {
          let tmp = end;
          end = start;
          start = tmp;
        }
      }

      if (start < now) throw new Error('Нельзя выбрать прошедшее время');
      console.log(`start:\t${start} | end:\t${end}`);
      const chosenSlots = [];
      for (
        let time = start;
        time <= end;
        time.setMinutes(time.getMinutes() + 30)
      ) {
        const timeStr = time.toLocaleTimeString();
        chosenSlots.push(timeStr);
      }

      const isAvailable = chosenSlots.every((slot) =>
        availableTimes.includes(slot)
      );
      console.log(`Свободне время:\t${availableTimes}`);
      console.log(`Выбранное время:\t${chosenSlots}`);
      if (!isAvailable) {
        throw new Error('Выбранное время уже занято');
      }
      await setTime(selectedDate, chosenSlots)
        .then(() => setIsBooking(true))
        .catch((error) => {
          console.error(`An unexpected error has occured: ${error.message}`);
          setBookingError(error.message);
          setIsBooking(false);
        });
    } catch (error) {
      console.error(`An unexpected error has occured: ${error.message}`);
      setBookingError(error.message);
      setIsBooking(false);
    }
  };

  return [bookTimeSlot, isBooking, bookingError];
}
