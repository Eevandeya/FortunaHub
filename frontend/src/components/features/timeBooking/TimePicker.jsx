import { useAvailableTimes, useTimeSlot } from '@hooks/timeHandler.js';
import Cell from './Cell.jsx';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { isWithinInterval } from 'date-fns';
import TimeUtils from '@root.utils/timeUtils.js';
import Loading from '@components.common/loader/Loading.jsx';
import styles from './time_booking.module.css';
import SelectButton from '../../common/button/SelectButton.jsx';

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

export function TimePicker({ date, ...other }) {
    const [availableTime, loading] = useAvailableTimes(date);
    const [bookTimeSlot, config, setIsBooking, isBooking] = useTimeSlot();
    const [borderTime, setBorderTime] = useState({ start: null, end: null });
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timeStamp = 60_000;
        const interval = setInterval(() => {
            setNow(Date.now());
        }, timeStamp);

        return () => clearInterval(interval);
    }, []);

    const parsedTimeSlots = useMemo(() => {
        if (config) {
            return TimeUtils.convertToTimeObj(
                [{ start: config?.openingTime, end: config?.closingTime }],
                date
            );
        }
    }, [config, date]);

    const isTimeAvailable = useCallback(
        (time, availableSlots) => {
            const checkTime = parsedTimeSlots[time];
            return availableSlots.some((slot) => {
                const start = parsedTimeSlots[slot.start];
                const end = parsedTimeSlots[slot.end];

                const [boundaryStart, boundaryEnd] = TimeUtils.setTimeBorders(
                    start,
                    end
                );
                return (
                    isWithinInterval(checkTime, {
                        start: boundaryStart,
                        end: boundaryEnd,
                    }) &&
                    TimeUtils.isBookingAvailable(
                        checkTime,
                        config.minTimeForBooking
                    )
                );
            });
        },
        [now, availableTime]
    );

    const Content = useMemo(() => {
        if (config && availableTime && !loading) {
            const times = Object.keys(parsedTimeSlots);
            return (
                <Fragment>
                    {times?.map((tm) => (
                        <Cell
                            key={tm}
                            time={tm}
                            isDisabled={!isTimeAvailable(tm, availableTime)}
                            isSelected={(function () {
                                const parsedTime = parsedTimeSlots[tm];
                                if (borderTime.start && borderTime.end) {
                                    const start =
                                        parsedTimeSlots[borderTime.start];
                                    const end = parsedTimeSlots[borderTime.end];
                                    return (
                                        isWithinInterval(parsedTime, {
                                            start,
                                            end,
                                        }) && isTimeAvailable(tm, availableTime)
                                    );
                                }
                                return (
                                    tm === borderTime.start ||
                                    tm === borderTime.end
                                );
                            })()}
                            setSelectedTime={() => handleTimeSelection(tm)}
                        />
                    ))}
                </Fragment>
            );
        }
    }, [
        config,
        availableTime,
        loading,
        parsedTimeSlots,
        isTimeAvailable,
        borderTime.start,
        borderTime.end,
        date,
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
        [availableTime, bookTimeSlot, date, parsedTimeSlots]
    );

    useEffect(() => {
        if (isBooking) {
            setIsBooking(false);
            setBorderTime({ start: null, end: null });
        }
    }, [isBooking]);

    return (
        <section className={styles.time_selector}>
            <div className={styles.time_slots_container}>
                {loading ? <Loading /> : Content}
            </div>
            {other.hasError && <p style={{ color: 'red' }}>{other.error}</p>}
            <footer className={styles.time_selector_footer}>
                <SelectButton
                    className={styles.time_selector_button}
                    onClick={booking}
                    aria-disabled={!borderTime.start || !borderTime.end}
                    value='Выбрать'
                />
            </footer>
        </section>
    );
}
