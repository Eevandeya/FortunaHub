import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '@store/bookingSlice.js';
import itemsReducer from '@store/itemsSlice.js';
import baseApi from '@root.api/api.js';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import dateTimeReducer from '@store/dateTimeSlice.js';
import { bookingResponseMiddleware } from '../../middleware/bookingValidation.js';

const rememberedKeys = ['booking', 'items', 'datetime'];
const reducers = {
    booking: bookingReducer,
    items: itemsReducer,
    datetime: dateTimeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};
const reducer = rememberReducer(reducers);

export default configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({})
            .concat(baseApi.middleware)
            .concat(bookingResponseMiddleware),
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys)
        ),
});
