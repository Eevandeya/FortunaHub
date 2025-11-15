import baseApi from './api.js';

const bookingPriceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBookingPrice: build.query({
            query: (bookingData) => ({
                url: 'bookings/calculate/',
                method: 'POST',
                body: bookingData,
            }),
        }),
    }),
});

export const { useGetBookingPriceQuery } = bookingPriceApi;
