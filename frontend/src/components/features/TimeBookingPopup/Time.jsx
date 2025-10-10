import { useAvailableTimes, useTimeSlot } from '@hooks/timeHandler.js';
import Modal from '@components.features/Modal/Modal.jsx';
import Cell from '@components.common/cell/Cell.jsx';
import { useEffect, useState, useMemo, useCallback } from 'react';
import useConfig from '@hooks/useConfig.js';
import { addMinutes, format, isWithinInterval, parse } from 'date-fns';
import TimeUtils from '@root.utils/timeUtils.js';
import Loading from '@components.common/loader/Loading.jsx';
import CloseButton from '@components.common/button/closeButton.jsx';

const checkConditions = ({ minBookingTime, start, end }) => {
    const format = 'HH:mm';
    const parsedMinBookingTime = TimeUtils.convertToMinutes({
        value: minBookingTime,
        format,
    });
    const startTime = TimeUtils.convertToMinutes({ value: start, format });
    const endTime = TimeUtils.convertToMinutes({ value: end, format });

    return Math.abs(startTime - endTime) >= parsedMinBookingTime;
};

export function Time({ modalActive, setModalActive, date }) {
    const { config } = useConfig();
    const [availableTime, loading] = useAvailableTimes(date);
    const [bookTimeSlot, setIsBooking, isBooking] = useTimeSlot();
    const [borderTime, setBorderTime] = useState({ start: null, end: null });

    useEffect(() => {
        if (!modalActive) {
            setBorderTime({ start: null, end: null });
        }
    }, [modalActive]);

    const parsedTimeSlots = useMemo(() => {
        if (config) {
            const parsedOpeningTime = parse(config.opening_time, 'HH:mm', date);
            const parsedClosingTime = parse(config.closing_time, 'HH:mm', date);

            const [checkedOpeningTime, checkedClosingTime] =
                TimeUtils.setTimeBorders(parsedOpeningTime, parsedClosingTime);

            const times = {};

            for (let temp = checkedOpeningTime; temp <= checkedClosingTime; ) {
                times[format(temp, 'HH:mm')] = temp;
                temp = addMinutes(temp, 30);
            }
            return times;
        }
    }, [config, date]);

    const isTimeAvailable = (time, availableSlots) => {
        const checkTime = parsedTimeSlots[time];

        return availableSlots.some((slot) => {
            const start = parsedTimeSlots[slot.start];
            const end = parsedTimeSlots[slot.end];

            const [boundaryStart, boundaryEnd] = TimeUtils.setTimeBorders(
                start,
                end
            );
            return isWithinInterval(checkTime, {
                start: boundaryStart,
                end: boundaryEnd,
            });
        });
    };

    const Content = useMemo(() => {
        if (config && availableTime && !loading) {
            const times = Object.keys(parsedTimeSlots);

            return times?.map((tm) => (
                <Cell
                    key={tm}
                    time={tm}
                    isDisabled={
                        !isTimeAvailable(tm, availableTime) ||
                        !TimeUtils.isBookingAvailable(
                            parsedTimeSlots[tm],
                            config.min_time_from_now_to_booking
                        )
                    }
                    isSelected={(function () {
                        const parsedTime = parsedTimeSlots[tm];
                        if (borderTime.start && borderTime.end) {
                            const start = parsedTimeSlots[borderTime.start];
                            const end = parsedTimeSlots[borderTime.end];
                            return (
                                isWithinInterval(parsedTime, { start, end }) &&
                                isTimeAvailable(tm, availableTime)
                            );
                        }
                        return tm === borderTime.start || tm === borderTime.end;
                    })()}
                    setSelectedTime={() => handleTimeSelection(tm)}
                />
            ));
        }
    }, [
        config,
        availableTime,
        loading,
        parsedTimeSlots,
        isTimeAvailable,
        borderTime.start,
        borderTime.end,
    ]);

    const handleTimeSelection = (selectedTime) => {
        setBorderTime((prev) => {
            if (!prev.start) {
                return { ...prev, start: selectedTime };
            }

            if (!prev.end) {
                const previousStart = parsedTimeSlots[prev.start];
                const parsedSelectedTime = parsedTimeSlots[selectedTime];

                if (parsedSelectedTime < previousStart) {
                    return { start: selectedTime, end: prev.start };
                }
                return { ...prev, end: selectedTime };
            }

            const previousStart = parsedTimeSlots[prev.start];
            const previousEnd = parsedTimeSlots[prev.end];
            const parsedSelectedTime = parsedTimeSlots[selectedTime];

            if (selectedTime === prev.start) {
                return { ...prev, start: null };
            }
            if (selectedTime === prev.end) {
                return { ...prev, end: null };
            }
            if (parsedSelectedTime < previousStart) {
                return { ...prev, start: selectedTime };
            }
            if (parsedSelectedTime > previousEnd) {
                return { ...prev, end: selectedTime };
            }

            const distanceToStart = Math.abs(
                parsedSelectedTime - previousStart
            );
            const distanceToEnd = Math.abs(previousEnd - parsedSelectedTime);

            return distanceToStart < distanceToEnd
                ? { ...prev, start: selectedTime }
                : { ...prev, end: selectedTime };
        });
    };

    const booking = useCallback(
        (e) => {
            e.preventDefault();
            const minBookingTime = config.minBookingTime;
            const canBooking = checkConditions({
                minBookingTime,
                ...borderTime,
            });
            if (canBooking) {
                setModalActive();
                const [startSlot, endSlot] = TimeUtils.setTimeBorders(
                    parsedTimeSlots[borderTime.start],
                    parsedTimeSlots[borderTime.end]
                );
                const operationProgress = bookTimeSlot(
                    startSlot,
                    endSlot,
                    date,
                    availableTime
                );
                if (operationProgress.success) {
                    setBorderTime({ start: null, end: null });
                }
            }
        },
        [availableTime, bookTimeSlot, date, parsedTimeSlots, setModalActive]
    );

    useEffect(() => {
        if (isBooking) {
            setModalActive(false);
            setIsBooking(false);
            setBorderTime({ start: null, end: null });
        }
    }, [isBooking]);

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <CloseButton onClick={setModalActive} />

            {loading ? <Loading /> : Content}

            <button
                className='button is-success'
                onClick={booking}
                disabled={!borderTime.start || !borderTime.end}>
                Выбрать
            </button>
        </Modal>
    );
}
