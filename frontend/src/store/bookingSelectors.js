import { selectItems } from './itemsSlice.js';
import { selectTimeRange } from './dateTimeSelectors.js';
import { createSelector } from '@reduxjs/toolkit';
import BookingPriceUtils from '@root.utils/bookingPriceUtils.js';
import { PRICE_PER_30 } from '@root.consts/constants.js';
import { selectPricePer30 } from './pricingSelector.js';

export const selectTotalPrice = createSelector(
    [selectItems, selectTimeRange, selectPricePer30],
    (items, timeRange, pricePer30) => {
        return BookingPriceUtils.calculateTotalPrice(
            items,
            timeRange,
            pricePer30
        );
    }
);
