import { useAvailableTimes, useTimeSlot } from '@hooks/TimeHandler.js';
import ArrayDate from '@root.consts/ArrayDate.js';
import Modal from '@components.features/Modal/Modal.jsx';
import Cell from '@components.common/cell/Cell.jsx';
import Select from '@components.common/select/Select.jsx';
import { useEffect, useState } from 'react';
import useConfig from '@hooks/useConfig.js';
import { addMinutes, format, isWithinInterval, parse } from 'date-fns';
import TimeUtils from '@root.utils/time_utils.js';
import Loading from '@components.common/loader/Loading.jsx';
import { requestErrorInterceptor, responseErrorInterceptor } from '@root.api/apiErrorHandler.js';
import api_handler from '@root.api/api.js';
import { useErrorBoundary } from '@context/Context.js';


const isTimeAvailable = (time, availableSlots) => {
  const checkTime = parse(time, 'HH:mm', new Date());

  return availableSlots.some((slot) => {
    const start = parse(slot.start, 'HH:mm', new Date());
    const end = parse(slot.end, 'HH:mm', new Date());

    const [boundary_start, boundary_end] = TimeUtils.setTimeBorders(start, end);
    return isWithinInterval(checkTime, {
      start: boundary_start,
      end: boundary_end,
    });
  });
};

function makeSheetFromTimes(opening_time, closing_time, date) {
  const picked_date =
    date.length === 0 ? new Date() : parse(date, 'yyyy-MM-dd', new Date());
  const parsed_opening_time = parse(opening_time, 'HH:mm', picked_date);
  const parsed_closing_time = parse(closing_time, 'HH:mm', picked_date);

  const [checked_opening_time, checked_closing_time] = TimeUtils.setTimeBorders(
    parsed_opening_time,
    parsed_closing_time
  );

  const times = [];

  for (let temp = checked_opening_time; temp < checked_closing_time; ) {
    times.push(format(temp, 'HH:mm'));
    temp = addMinutes(temp, 30);
  }

  return times;
}

function checkConditions({ min_booking_time, start, end }) {
  const format = 'HH:mm';
  const parsed_min_booking_time = TimeUtils.convertToMinutes({
    value: min_booking_time,
    format,
  });
  const start_time = TimeUtils.convertToMinutes({ value: start, format });
  const end_time = TimeUtils.convertToMinutes({ value: end, format });

  return Math.abs(start_time - end_time) >= parsed_min_booking_time;
}

export default function Time({ modalActive, setModalActive }) {
  const config = useConfig();
  const [times, setTimes] = useState(null);
  const [date, setDate] = useState('');
  const [availableTime, loading] = useAvailableTimes(date);
  const [bookTimeSlot, isBooking] = useTimeSlot();
  const [borderTime, setBorderTime] = useState({ start: null, end: null });
  const { addError } = useErrorBoundary()

  useEffect(() => {

    requestErrorInterceptor(api_handler, addError)
    responseErrorInterceptor(api_handler, addError)
  }, [addError])

  useEffect(() => {
    if (isBooking) {
      setModalActive(false);
      setBorderTime({ start: null, end: null });
    }
  }, [isBooking]);

  useEffect(() => {
    const getOptions = () => {
      const opening_time = config.opening_time ?? '00:00';
      const closing_time = config.closing_time ?? '24:00';
      const time_interval = makeSheetFromTimes(
        opening_time,
        closing_time,
        date
      );
      setTimes(time_interval);
    };
    if (config) {
      getOptions();
    }
  }, [config, date]);

  const handleTimeSelection = (selectedTime) => {
    setBorderTime((prev) => {
      if (!prev.start) {
        return { ...prev, start: selectedTime };
      }

      if (!prev.end) {
        const previous_start = parse(prev.start, 'HH:mm', new Date());
        const parsedSelectedTime = parse(selectedTime, 'HH:mm', new Date());

        if (parsedSelectedTime < previous_start) {
          return { start: selectedTime, end: prev.start };
        }
        return { ...prev, end: selectedTime };
      }

      const previous_start = parse(prev.start, 'HH:mm', new Date());
      const previous_end = parse(prev.end, 'HH:mm', new Date());
      const parsedSelectedTime = parse(selectedTime, 'HH:mm', new Date());

      if (selectedTime === prev.start) {
        return { ...prev, start: null };
      }
      if (selectedTime === prev.end) {
        return { ...prev, end: null };
      }
      if (parsedSelectedTime < previous_start) {
        return { ...prev, start: selectedTime };
      }
      if (parsedSelectedTime > previous_end) {
        return { ...prev, end: selectedTime };
      }

      const distanceToStart = Math.abs(parsedSelectedTime - previous_start);
      const distanceToEnd = Math.abs(previous_end - parsedSelectedTime);

      return distanceToStart < distanceToEnd
        ? { ...prev, start: selectedTime }
        : { ...prev, end: selectedTime };
    });
  };

  const booking = async (e) => {
    e.preventDefault();
    const min_booking_time = config.min_booking_time;
    const canBooking = checkConditions({
      min_booking_time,
      date,
      ...borderTime,
    });

    if (canBooking) {
      await bookTimeSlot(borderTime.start, borderTime.end, date, availableTime);
    }
  };

  return (
    <Modal active={modalActive} setActive={setModalActive}>
      <div className="select is-warning is-rounded">
        <Select
          options={ArrayDate}
          value={date}
          onChange={setDate}
          defaultValue="Выберите дату"
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        times?.map((tm) => (
          <div key={tm}>
            <Cell
              time={tm}
              isDisabled={!isTimeAvailable(tm, availableTime)}
              isSelected={(function () {
                const parsed_time = parse(tm, 'HH:mm', new Date());
                if (borderTime.start && borderTime.end) {
                  const start = parse(borderTime.start, 'HH:mm', new Date());
                  const end = parse(borderTime.end, 'HH:mm', new Date());
                  return (
                    isWithinInterval(parsed_time, { start, end }) &&
                    isTimeAvailable(tm, availableTime)
                  );
                }
                return tm === borderTime.start || tm === borderTime.end;
              })()}
              setSelectedTime={() => handleTimeSelection(tm)}
            />
          </div>
        ))
      )}

      <button
        className="button is-success"
        onClick={booking}
        disabled={!borderTime.start || !borderTime.end}
      >
        Забронировать
      </button>
    </Modal>
  );
}
