import baseApi from './api.js';

const timesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAvailableTimes: build.query({
            query: (times) => ({
                url: 'bookings/free-slots/',
                params: { date: times.date },
            }),
            providesTags: ['Booking'],
        }),
    }),
    overrideExisting: true,
});

export const { useGetAvailableTimesQuery } = timesApi;
