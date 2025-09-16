import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*
export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async function (_, { rejectWithValue }) {
        try {
            const response = await getItemsQuantity();
            if (response.statusText != 'OK') {
                throw new Error(response.message);
            }
            const inventory = response.data?.map((item) => ({
                ...item,
                unit_price: parseFloat(item?.unit_price),
            }));
            if (!Array.isArray(inventory))
                throw new Error('Данные инвентаря должны быть массивом');
            if (
                !inventory.every(
                    (item) =>
                        typeof item === 'object' &&
                        item !== null &&
                        !Array.isArray(item)
                )
            ) {
                throw new Error('Неверные данные в инвентаре');
            }
            return inventory;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
*/

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
