import baseApi from '@root.api/api.js';
import { setBookingStatus } from '@store/bookingSlice.js';

export const bookingResponseMiddleware = (store) => (next) => (action) => {
    if (baseApi.endpoints.setBooking.matchFulfilled(action)) {
        const successMessage = action.payload?.data;
        const lastAttempt = new Date().toLocaleString();
        const status = 'success';
        store.dispatch(
            setBookingStatus({
                statusMessage: successMessage,
                lastAttempt,
                status,
            })
        );
    }

    if (baseApi.endpoints.setBooking.matchRejected(action)) {
        const errorMessage = action.payload?.data || action.error;
        const lastAttempt = new Date().toLocaleString();
        const status = 'error';
        store.dispatch(
            setBookingStatus({
                statusMessage: errorMessage,
                lastAttempt,
                status,
            })
        );
    }

    return next(action);
};
