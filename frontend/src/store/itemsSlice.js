import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
    name: 'items',
    initialState: { items: [], reload: true },
    selectors: {
        selectItem: (state, slug) =>
            state.items.find((item) => item.slug === slug),
        selectItems: (state) => state.items,
        selectReload: (state) => state.reload,
    },
    reducers: {
        addItem(state, action) {
            state.items = action.payload.items;
        },
        removeItem(state, action) {
            state.items?.filter((item) => item.slug !== action.payload.slug);
        },
        reloadItems: (state) => {
            state.reload = !state.reload;
        },
    },
});

export const { reloadItems } = itemsSlice.actions;
export const { selectReload } = itemsSlice.selectors;
export default itemsSlice.reducer;
