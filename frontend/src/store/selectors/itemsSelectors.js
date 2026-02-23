import { createSelector } from '@reduxjs/toolkit';
import { selectItems } from '@store/itemsSlice.js';

export const selectBookingItems = createSelector([selectItems], (items) => {
    return items?.map((item) => ({ slug: item.slug, quantity: item.quantity }));
});
