import {
    addDays,
    addMinutes,
    format,
    getHours,
    getMinutes,
    getUnixTime,
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
     * Converts a date/time value into minutes since Unix epoch.
     *
     * The method accepts several input formats:
     * 1. A Date instance
     * 2. A string representing date/time
     * 3. An object containing separate date and time values
     *
     * @param {Object} params
     * @param {Date|string|{date: string, time: string}} params.value
     * Value to convert. Can be:
     * - a Date object
     * - a string containing date/time
     * - an object with separate `date` and `time` fields
     *
     * @param {string|{dateFormat: string, timeFormat: string}} params.format
     * Format description used for parsing the value.
     * - If `value` is a string, this should be a date/time format string.
     * - If `value` is an object, it should contain `dateFormat` and `timeFormat`.
     *
     * @returns {number}
     * The number of minutes since Unix epoch.
     *
     * @throws {Error}
     * Throws if the value cannot be parsed with the provided format.
     */
    static convertToMinutes({ value, format }) {
        if (
            typeof value === 'object' &&
            value?.date &&
            typeof format === 'object' &&
            format?.dateFormat
        ) {
            const parsedDate = parse(value, format.dateFormat, new Date());
            const parsedTime = parse(value, format.format, parsedDate);
            return Math.floor(getUnixTime(parsedTime) / 60);
        } else if (value instanceof Date) {
            return Math.floor(getUnixTime(value) / 60);
        } else {
            const parsedDate = parse(value, format, new Date());
            return Math.floor(getUnixTime(parsedDate) / 60);
        }
    }
    /**
     * Converts a time string to minutes since midnight
     * @param {Object} params - Conversion parameters
     * @param {string} params.value - Time string to parse
     * @param {string} params.format - Time string format (e.g., 'HH:mm')
     * @returns {number|Error} Minutes since midnight or error if invalid format
     */
    static convertToMinutesSinceMidnight({ value, format }) {
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
     * @param {string} format - datetime format
     * @returns {boolean} true if booking is available, false otherwise
     */
    static isBookingAvailable(
        slotTime,
        minPreparationTime = '01:00',
        format = 'HH:mm'
    ) {
        const now = Date.now();

        const convertPreparationTime = this.convertToMinutesSinceMidnight({
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
     * @param {string} format - datetime format
     * @returns {boolean} true if time slot is available, false otherwise
     */
    static isTimeSlotAvailable(
        freeTimes,
        selectedTime,
        selectedDate,
        format = 'HH:mm'
    ) {
        const [start, end] = this.setTimeBorders(
            selectedTime.start,
            selectedTime.end
        );

        for (const times of freeTimes) {
            let freeStartTime = parse(times.start, format, selectedDate);
            let freeEndTime = parse(times.end, format, selectedDate);
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
     * @param {string} format - datetime format
     * @returns {number} - range between end and start time
     * @description Calculate range between two times
     */
    static calculateRange(time, format = 'HH:mm:ss') {
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
     * @param {string} timeFormat - format of time
     * @param {string} dateFormat - format of date
     * @returns {string[]|*[]}
     * @description concatenate date with start and time slots with similar to Iso format
     */
    static concatenateDateTime(
        time,
        date,
        timeFormat = 'HH:mm',
        dateFormat = 'yyyy-MM-dd'
    ) {
        if (!time.start || !time.end || !date) {
            return [undefined, undefined];
        }
        try {
            const formatDate = parse(date, dateFormat, Date.now());
            const startTime = parse(time.start, timeFormat, formatDate);
            const endTime = parse(time.end, timeFormat, formatDate);
            return this.formatToIso(this.setTimeBorders(startTime, endTime));
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     *
     * @param {Array<{ start: string, end: string }>} times - Array of time ranges.
     * @param {Date} date - Base date used to construct full DateTime values.
     * @param {string} [timeFormat='HH:mm'] - Format of the input time strings.
     *
     * @returns {Object<string, Date>}
     * An object where:
     * - keys are formatted time strings
     * - values are corresponding Date objects
     *
     * @description Converts an array of time ranges into an object of formatted time slots.
     */
    static convertToTimeObj(times, date, timeFormat = 'HH:mm') {
        const dateTimes = times.map((slot) => {
            const parsedOpeningTime = parse(slot.start, timeFormat, date);
            const parsedClosingTime = parse(slot.end, timeFormat, date);

            const [checkedOpeningTime, checkedClosingTime] =
                this.setTimeBorders(parsedOpeningTime, parsedClosingTime);
            return { start: checkedOpeningTime, end: checkedClosingTime };
        });

        const timesList = dateTimes.reduce((acc, item) => {
            for (let temp = item.start; temp <= item.end; ) {
                acc[format(temp, timeFormat)] = temp;
                temp = addMinutes(temp, 30);
            }
            return acc;
        }, {});

        return timesList;
    }

    /**
     *
     * @param {string} date - Date string.
     * @param {Object<string, string>} time - Object containing time strings.
     * @param {string} [dateFormat='yyyy-MM-dd'] - Format of the date string.
     * @param {string} [timeFormat='HH:mm:ss'] - Format of the time strings.
     *
     * @returns {Object<string, Date>}
     * An object with the same keys as the input `time` object,
     * but with values converted to Date instances.
     *
     * @description Converts date and time values from state (stored as strings)
     */
    static getDateTimeFromState(
        date,
        time,
        dateFormat = 'yyyy-MM-dd',
        timeFormat = 'HH:mm:ss'
    ) {
        const parsedDate = parse(date, dateFormat, new Date());
        const parsedTime = {};
        for (const tm in time) {
            parsedTime[tm] = parse(time[tm], timeFormat, parsedDate);
        }
        return parsedTime;
    }
}

export default TimeUtils;
