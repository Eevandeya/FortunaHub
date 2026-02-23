import { selectBookingDateTime } from './dateTimeSelectors.js';
import { selectBookingItems } from '@store/itemsSlice.js';
import { selectUserData } from '@store/userSlice.js';

export const selectBookingData =
    ([selectBookingDateTime, selectBookingItems, selectUserData],
    (datetime, items, userData) => {
        return { ...datetime, items, ...userData };
    });
