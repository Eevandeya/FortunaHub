import { createSelector } from '@reduxjs/toolkit';
import { PRICE_PER_HOUR } from '@root.consts/constants.js';
import { selectItems } from '@store/itemsSlice.js';
import { selectTimeRange } from './dateTimeSelectors.js';
import BookingPriceUtils from '@root.utils/bookingPriceUtils.js';

export const selectPricingData = (state) => {
    const cachedData = state.api.queries?.['getPricing(undefined)']?.data;
    return cachedData || null;
};

export const selectPricePerHour = createSelector(
    [selectPricingData],
    (pricing) => {
        const pricePerHour = pricing?.find(
            (price) => price.name.toLowerCase() === 'hourly_rent'
        );
        return pricePerHour?.price ?? PRICE_PER_HOUR;
    }
);

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
