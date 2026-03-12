import baseApi from './api.js';
import { resetUser } from '@store/userSlice.js';
import { resetDateTime } from '@store/dateTimeSlice.js';
import { resetItems } from '@store/itemsSlice.js';
import { resetBookingStatus } from '@store/bookingSlice.js';

const bookingStatusApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBookingStatus: build.query({
            query: (publicId) => ({
                url: '/bookings/payment-status/',
                params: { publicId },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(resetBookingStatus());
                    dispatch(resetItems());
                    dispatch(resetDateTime());
                    dispatch(resetUser());
                } catch {
                    /* empty */
                }
            },
        }),
    }),
    overrideExisting: true,
});

export default bookingStatusApi;
