import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '@store/bookingSlice.js';
import itemsReducer from '@store/itemsSlice.js';
import baseApi from '@root.api/api.js';

export default configureStore({
    reducer: {
        booking: bookingReducer,
        items: itemsReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(baseApi.middleware),
});
