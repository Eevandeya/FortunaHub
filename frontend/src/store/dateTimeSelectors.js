import { createSelector } from '@reduxjs/toolkit';
import { selectTime } from './dateTimeSlice.js';
import TimeUtils from '@root.utils/timeUtils.js';

export const selectTimeRange = createSelector([selectTime], (time) => {
    if (!time.start || !time.end) return null;
    return TimeUtils.calculateRange(time);
});
