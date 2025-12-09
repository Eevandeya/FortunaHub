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
    isMatch,
} from 'date-fns';

/**
 * Utility class for time and date operations
 */
class TimeUtils {
    /**
     * Gets the number of minutes since midnight for the given date
     * @param {Date} date - Date to calculate minutes from midnight
     * @returns {number} Number of minutes since midnight
     */
    static getMinutesSinceMidnight(date) {
        return getHours(date) * 60 + getMinutes(date);
    }

    /**
     * Formats an array of dates to ISO strings
     * @param {number[]} datetime - Array of Date objects to format
     * @returns {string[]} Array of strings in "yyyy-MM-dd'T'HH:mm:ss" format
     * @throws {Error} If date conversion fails
     */
    static formatToIso(datetime) {
        try {
            return datetime.map((time) => {
                if (time instanceof Date) {
                    return format(time, "yyyy-MM-dd'T'HH:mm:ss");
                }
            });
        } catch (error) {
            throw new Error(`Date conversion error: ${error}`);
        }
    }

    /**
     * Converts a time string to minutes since midnight
     * @param {Object} params - Conversion parameters
     * @param {string} params.value - Time string to parse
     * @param {string} params.format - Time string format (e.g., 'HH:mm')
     * @returns {number|Error} Minutes since midnight or error if invalid format
     */
    static convertToMinutes({ value, format }) {
        try {
            const normalDateValue = parse(value, format, new Date());
            return this.getMinutesSinceMidnight(normalDateValue);
        } catch (error) {
            throw new Error(`${error}.\n Expected format: ${format}`);
        }
    }

    /**
     * Checks if a time slot is available for booking considering minimum preparation time
     * @param {Date} slotTime - Time slot to book
     * @param {string} [minPreparationTime='01:00'] - Minimum preparation time in HH:mm format
     * @returns {boolean} true if booking is available, false otherwise
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

    /**
     * Sets correct time boundaries, handling cases that cross midnight
     * @param {Date} startTime - Start time
     * @param {Date} endTime - End time
     * @returns {Date[]} Array with correct boundaries [startTime, endTime]
     */
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
     * Checks if a time slot is available for reservation
     * @param {Object[]} freeTimes - Array of free time intervals
     * @param {Object} freeTimes[].start - Start of free interval
     * @param {Object} freeTimes[].end - End of free interval
     * @param {Object} selectedTime - Selected time interval
     * @param {Date} selectedTime.start - Start of selected time
     * @param {Date} selectedTime.end - End of selected time
     * @param {Date} selectedDate - Date to check availability for
     * @returns {boolean} true if time slot is available, false otherwise
     */
    static isTimeSlotAvailable(freeTimes, selectedTime, selectedDate) {
        const [start, end] = this.setTimeBorders(
            selectedTime.start,
            selectedTime.end
        );

        for (const times of freeTimes) {
            let freeStartTime = parse(times.start, 'HH:mm', selectedDate);
            let freeEndTime = parse(times.end, 'HH:mm', selectedDate);
            [freeStartTime, freeEndTime] = this.setTimeBorders(
                freeStartTime,
                freeEndTime
            );

            if (
                isWithinInterval(start, {
                    start: freeStartTime,
                    end: freeEndTime,
                }) &&
                isWithinInterval(end, {
                    start: freeStartTime,
                    end: freeEndTime,
                })
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {Object} time - Selected time slots
     * @returns {number} - range between end and start time
     * @description Calculate range between two times
     */
    static calculateRange(time) {
        const format = 'HH:mm:ss';
        try {
            let startTime = parse(time.start, format, Date.now());
            let endTime = parse(time.end, format, Date.now());
            if (isAfter(startTime, endTime)) {
                endTime = setHours(setMinutes(addDays(startTime, 1), 0), 0);
            }
            const range = endTime - startTime;
            const timeRange = range / 1000 / 60 / 60;
            return timeRange;
        } catch (error) {
            throw new Error(`${error}.\n Expected format: ${format}`);
        }
    }

    /**
     *
     * @param {Object} time - selected time slots
     * @param {string} date - average date
     * @returns {string[]|*[]}
     * @description concatenate date with start and time slots with similar to Iso format
     */
    static concatenateDateTime(time, date) {
        if (!time.start || !time.end || !date) {
            return [undefined, undefined];
        }
        try {
            const formatDate = parse(date, 'yyyy-MM-dd', Date.now());
            let startTime, endTime;
            if (isMatch(time.start, 'HH:mm') && isMatch(time.end, 'HH:mm')) {
                const format = 'HH:mm';
                startTime = parse(time.start, format, formatDate);
                endTime = parse(time.end, format, formatDate);
            } else if (
                isMatch(time.start, 'HH:mm:ss') &&
                isMatch(time.end, 'HH:mm:ss')
            ) {
                const format = 'HH:mm:ss';
                startTime = parse(time.start, format, formatDate);
                endTime = parse(time.end, format, formatDate);
            } else {
                throw new Error('Invalid time format');
            }
            return this.formatToIso(this.setTimeBorders(startTime, endTime));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default TimeUtils;
