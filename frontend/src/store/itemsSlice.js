import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
    name: 'items',
    initialState: { items: [] },
    selectors: {
        selectItem: (state, slug) =>
            state.items.find((item) => item.slug === slug),
        selectItems: (state) => state.items,
        selectBookingItems: (state) =>
            state.items.map((item) => ({
                slug: item.slug,
                quantity: item.quantity,
            })),
    },
    reducers: {
        addItems(state, action) {
            state.items = action.payload.items;
        },
        removeItem(state, action) {
            state.items = state.items?.filter(
                (item) => item.slug !== action.payload.slug
            );
        },
        resetItems(state) {
            state.items = [];
        },
    },
});

export const { addItems, removeItem, resetItems } = itemsSlice.actions;
export const { selectItems } = itemsSlice.selectors;
export default itemsSlice.reducer;
