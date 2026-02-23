import { createSelector } from '@reduxjs/toolkit';
import { selectDateTime, selectTime } from '@store/dateTimeSlice.js';
import TimeUtils from '@root.utils/timeUtils.js';

export const selectTimeRange = createSelector([selectTime], (time) => {
    if (!time?.start || !time?.end) return null;
    return TimeUtils.calculateRange(time);
});

export const selectBookingDateTime = createSelector(
    [selectDateTime],
    (datetime) => {
        const time = datetime.time;
        const date = datetime.date;
        if (!time?.start || !time?.end || !date) return null;
        const [start, end] = TimeUtils.concatenateDateTime(
            time,
            date,
            'HH:mm:ss',
            'yyyy-MM-dd'
        );
        return { start, end };
    }
);
