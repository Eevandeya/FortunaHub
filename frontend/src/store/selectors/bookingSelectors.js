import { selectBookingDateTime } from './dateTimeSelectors.js';
import { selectBookingItems } from './itemsSelectors.js';
import { selectUserData } from '@store/userSlice.js';
import { createSelector } from '@reduxjs/toolkit';

export const selectBookingData = createSelector(
    [selectBookingDateTime, selectBookingItems, selectUserData],
    (datetime, items, userData) => {
        return { timeSlot: datetime, items, ...userData };
    }
);
