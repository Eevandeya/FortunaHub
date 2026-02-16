import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '@store/bookingSlice.js';
import itemsReducer from '@store/itemsSlice.js';
import baseApi from '@root.api/api.js';
import { rememberEnhancer, rememberReducer } from 'redux-remember';
import dateTimeReducer from '@store/dateTimeSlice.js';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const rememberedKeys = ['booking', 'items', 'datetime'];
const reducers = {
    booking: bookingReducer,
    items: itemsReducer,
    datetime: dateTimeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};
const reducer = rememberReducer(reducers);

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(baseApi.middleware),
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys)
        ),
});

setupListeners(store.dispatch);

export default store;
