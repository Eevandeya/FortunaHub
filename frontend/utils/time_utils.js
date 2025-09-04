import {
    addDays,
    addMinutes,
    format,
    getHours,
    getMinutes,
    isAfter,
    isEqual,
    isWithinInterval,
    parse,
    setHours,
    setMinutes,
} from 'date-fns';

class TimeUtils {
    static getMinutesSinceMidnight(date) {
        return getHours(date) * 60 + getMinutes(date);
    }

    static formatToIsos(times) {
        try {
            return times.map((time) => {
                if (time instanceof Date) {
                    return format(time, "yyyy-MM-dd'T'HH:mm:ss");
                }
            });
        } catch (error) {
            throw new Error('Ошибка преобразования даты');
        }
    }
    static convertToMinutes({ value, format }) {
        try {
            const normal_date_value = parse(value, format, new Date());
            return this.getMinutesSinceMidnight(normal_date_value);
        } catch (error) {
            return new Error(
                `Неверный формат переданных данных. Необходимо передать данные в формате: ${format}`
            );
        }
    }

    /**
     * Checks if a reservation can be made for the current time
     * @param {date} slotTime
     * @param {string} minPreparationTime
     * @returns {boolean}
     */
    static isBookingAvailable(slotTime, minPreparationTime = '01:00') {
        const now = Date.now();

        const format = 'HH:mm';
        const convertPreparationTime = this.convertToMinutes({
            value: minPreparationTime,
            format,
        });
        const minFreeTime = addMinutes(now, convertPreparationTime);

        return isAfter(slotTime, minFreeTime);
    }

    static setTimeBorders(startTime, endTime) {
        if (isAfter(startTime, endTime)) {
            const midnight = setHours(setMinutes(startTime, 0), 0);
            if (isEqual(endTime, midnight)) {
                endTime = setHours(setMinutes(addDays(startTime, 1), 0), 0);
            } else {
                [startTime, endTime] = [endTime, startTime];
            }
        }
        return [startTime, endTime];
    }

    /**
     * Checks if it is possible to make a reservation
     * @param {object} freeTimes
     * @param {object} selectedTime
     * @param {date} selectedDate
     * @returns {boolean}
     */
    static isTimeSlotAvailable(freeTimes, selectedTime, selectedDate) {
        const [start, end] = this.setTimeBorders(
            selectedTime.start,
            selectedTime.end
        );

        for (const times of freeTimes) {
            let free_start_time = parse(times.start, 'HH:mm', selectedDate);
            let free_end_time = parse(times.end, 'HH:mm', selectedDate);
            [free_start_time, free_end_time] = this.setTimeBorders(
                free_start_time,
                free_end_time
            );

            if (
                isWithinInterval(start, {
                    start: free_start_time,
                    end: free_end_time,
                }) &&
                isWithinInterval(end, {
                    start: free_start_time,
                    end: free_end_time,
                })
            ) {
                return true;
            }
        }
    }
}

export default TimeUtils;
