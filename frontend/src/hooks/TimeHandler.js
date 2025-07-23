import { useState, useEffect } from 'react';
import { getAvailableTimes, setTime } from '../api/timeSlotsApi.js';
import { useFetching } from './useFetching.js';

function checkTimePermission(availableTimes, chosenTime)
{
    for (let i = 0; i < availableTimes.lenght(); i++){
      if(availableTimes[i].start < chosenTime.start && availableTimes[i].end > chosenTime.end){
        return true
      }
    }
}


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

      const bookingTime = JSON.stringify({ start: start, end: end });

      const isAvailable = checkTimePermission(availableTimes, bookingTime)
      console.log(`Свободное время:\t${availableTimes}`);
      console.log(`Выбранное время:\t${bookingTime}`);
      if (!isAvailable) {
        throw new Error('Выбранное время уже занято');
      }

      await setTime(selectedDate, bookingTime)
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
