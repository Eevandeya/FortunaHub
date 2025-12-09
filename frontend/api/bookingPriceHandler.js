import baseApi from './api.js';

const bookingPriceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBookingPrice: build.query({
            /**
             * use query request because don't change data on backend
             * @param bookingData
             * @returns {{url: string, method: string, body}}
             */
            query: (bookingData) => ({
                url: 'bookings/calculate/',
                method: 'POST',
                body: bookingData,
            }),
        }),
    }),
});

export const { useGetBookingPriceQuery } = bookingPriceApi;
