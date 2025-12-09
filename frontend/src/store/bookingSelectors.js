import { selectItems } from './itemsSlice.js';
import { selectTimeRange } from './dateTimeSelectors.js';
import { createSelector } from '@reduxjs/toolkit';
import BookingPriceUtils from '@root.utils/bookingPriceUtils.js';
import { selectPricePerHour } from './pricingSelector.js';

export const selectTotalPrice = createSelector(
    [selectItems, selectTimeRange, selectPricePerHour],
    (items, timeRange, pricePerHour) => {
        return BookingPriceUtils.calculateTotalPrice(
            items,
            timeRange,
            pricePerHour
        );
    }
);
