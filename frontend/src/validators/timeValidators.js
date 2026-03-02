import { parse } from 'date-fns';
import TimeUtils from '@root.utils/timeUtils.js';

export const checkDateSelected = (data) => {
    if (!data.dateTime?.date) {
        return {
            message: 'Выберите дату брони',
            pageId: 'time',
            place: 'date',
        };
    }
    return null;
};

export const checkTimeSelected = (data) => {
    if (!data.dateTime?.time?.start || !data.dateTime?.time?.end) {
        return {
            message: 'Выберите время',
            pageId: 'time',
            place: 'timeSlots',
        };
    }
    return null;
};

export const checkTimeDeprecated = (data) => {
    try {
        const checkTime = TimeUtils.getDateTimeFromState(data.dateTime.date, {
            start: data.dateTime.time?.start,
        });
        if (
            !TimeUtils.isBookingAvailable(
                checkTime.start,
                data.config?.data?.min_time_from_now_to_booking
            )
        ) {
            return {
                message: 'Вы выбрали недопустимое время. Выберите время заново',
                pageId: 'time',
                place: 'timeSlots',
            };
        }
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        return null;
    }
    return null;
};

export const checkTimeBooked = (data) => {
    try {
        const parsedTime = TimeUtils.getDateTimeFromState(
            data.dateTime.date,
            data.dateTime.time
        );
        if (
            !TimeUtils.isTimeSlotAvailable(
                data.freeSlots,
                parsedTime,
                parse(data.dateTime.date, 'yyyy-MM-dd', new Date()),
                'HH:mm'
            )
        ) {
            return {
                message: 'Это время уже занято. Выберите время заново',
                pageId: 'time',
                place: 'timeSlots',
            };
        }
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        return null;
    }
    return null;
};
