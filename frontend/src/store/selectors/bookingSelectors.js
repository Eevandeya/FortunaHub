import { selectBookingDateTime } from './dateTimeSelectors.js';
import { selectBookingItems } from '@store/itemsSelectors.js';
import { selectUserData } from '@store/userSlice.js';
import { createSelector } from '@reduxjs/toolkit';

export const selectBookingData = createSelector(
    [selectBookingDateTime, selectBookingItems, selectUserData],
    (datetime, items, userData) => {
        return { ...datetime, items, ...userData };
    }
);
