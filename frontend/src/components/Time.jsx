import { useAvailableTimes, useTimeSlot } from '../hooks/TimeHandler.js';
import ArrayDate from '../../../consts/ArrayDate.js';
import Modal from './Modal/Modal.jsx';
import Cell from './cell/Cell.jsx';
import Select from './UI/Select.jsx';
import { useState, useEffect } from 'react';
import { useConfig } from '../contexts/ConfigContext.js'
import Loading from './UI/loader/Loading.jsx';

function makeSheetFromTimes(opening_time, closing_time) {
  const date = new Date(1970, 1, 1, opening_time, 0, 0);
  const times = [];
  for (let i = opening_time; date.getHours() < closing_time; ) {
    date.setMinutes(date.getMinutes() + 30);
    times.push(date?.toLocaleTimeString());
  }
  return times;
}

function checkConditions({
  min_booking_time,
  selectedDate,
  startTime,
  endTime,
}) {
  const start_time = new Date(`${selectedDate}T${startTime}`);
  const end_time = new Date(`${selectedDate}T${endTime}`);
  return Math.abs(start_time - end_time) < min_booking_time;
}

let times = null;

export default function Time({ modalActive, setModalActive }) {

  const [config, error] = useConfig();
  const [date, setDate] = useState('');
  const [availableTime, loading] = useAvailableTimes(date);
  const [bookTimeSlot, isBooking, bookingError] = useTimeSlot();
  const [borderTime, setBorderTime] = useState({
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    const getOptions = () => {
      const opening_time = config.opening_time ?? 0;
      const closing_time = config.closing_time ?? 24;
      times = makeSheetFromTimes(opening_time, closing_time);
    }

    getOptions();
  })

  useEffect(() => {
    if (isBooking) {
      setModalActive(false);
      setBorderTime({ startTime: null, endTime: null });
    }
  }, [isBooking]);

  const setChosenTime = (time) => {
    if (!borderTime?.startTime) {
      setBorderTime({ ...borderTime, startTime: time });
      return;
    }

    if (!borderTime?.endTime) {
      setBorderTime({ ...borderTime, endTime: time });
      return;
    }
    const { startTime, endTime } = borderTime;
    if (time < startTime) {
      setBorderTime({ ...borderTime, startTime: time });
    } else if (time > endTime) {
      setBorderTime({ ...borderTime, endTime: time });
    } else if (time === startTime) {
      setBorderTime({ ...borderTime, startTime: null });
    } else if (time === endTime) {
      setBorderTime({ ...borderTime, endTime: null });
    }
  };

  const booking = async (e) => {
    e.preventDefault();
    const min_booking_time = config.min_booking_time;
    const canBooking = checkConditions({
      min_booking_time,
      selectedDate,
      ...borderTime,
    });
    if(canBooking) {
      await bookTimeSlot(
        borderTime.startTime,
        borderTime.endTime,
        date,
        availableTime
      );
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
      {bookingError !== null && <p style={{ color: 'red' }}>{bookingError}</p>}
      {times.map((tm) => {
        return (
          <div key={tm}>
            <Cell
              time={tm}
              isDisabled={!availableTime.includes(tm)}
              setChosenTime={setChosenTime}
            ></Cell>
          </div>
        );
      })}
      <button className="button is-success" onClick={booking}>
        Booking
      </button>
    </Modal>
  );
}
