import { createSelector } from '@reduxjs/toolkit';
import { PRICE_PER_HOUR } from '@root.consts/constants.js';

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
