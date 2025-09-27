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
     * @param {Date[]} datetime - Array of Date objects to format
     * @returns {string[]} Array of strings in "yyyy-MM-dd'T'HH:mm:ss" format
     * @throws {Error} If date conversion fails
     */
    static formatToIsos(datetime) {
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
            const normal_date_value = parse(value, format, new Date());
            return this.getMinutesSinceMidnight(normal_date_value);
        } catch (error) {
            throw new Error(
                `${error}.\n Expected format: ${format}`
            );
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
            let free_start_time = parse(times.start, 'HH:mm', selectedDate);
            let free_end_time = parse(times.end, 'HH:mm', selectedDate);
            [free_start_time, free_end_time] = this.setTimeBorders(
                free_start_time,
                free_end_time
            );

            return (
                isWithinInterval(start, {
                    start: free_start_time,
                    end: free_end_time,
                }) &&
                isWithinInterval(end, {
                    start: free_start_time,
                    end: free_end_time,
                })
            )
        }
    }
}

export default TimeUtils;