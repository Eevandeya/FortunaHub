import { selectItems } from './itemsSlice.js';
import { selectTimeRange } from './dateTimeSelectors.js';
import { createSelector } from '@reduxjs/toolkit';
import BookingPriceUtils from '@root.utils/bookingPriceUtils.js';
import { PRICE_PER_30 } from '@root.consts/constants.js';

export const selectTotalPrice = createSelector(
    [selectItems, selectTimeRange],
    (items, timeRange) => {
        return BookingPriceUtils.calculateTotalPrice(
            items,
            timeRange,
            PRICE_PER_30
        );
    }
);
