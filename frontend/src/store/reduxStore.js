import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '@store/bookingSlice.js';
import itemsReducer from '@store/itemsSlice.js';
import baseApi from '@root.api/api.js';
import userReducer from '@store/userSlice.js';
import { rememberEnhancer, rememberReducer } from 'redux-remember';
import dateTimeReducer from '@store/dateTimeSlice.js';

const rememberedKeys = ['booking', 'items', 'datetime', 'user'];
const reducers = {
    items: itemsReducer,
    booking: bookingReducer,
    datetime: dateTimeReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};
const reducer = rememberReducer(reducers);

export default configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(baseApi.middleware),
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys)
        ),
});
