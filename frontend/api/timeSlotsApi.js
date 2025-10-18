import baseApi from './api.js';

/**
 * Times API for fetching available booking slots
 * @namespace timesApi
 */
const timesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        /**
         * Get available time slots for a specific date
         * @param {Object} times - Date parameters
         * @param {string} times.date - Date in YYYY-MM-DD format
         * @returns {Object} Query configuration
         */
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

/**
 * Hook for fetching available booking times
 * @returns {Object} Query result with available time slots
 */
export const { useGetAvailableTimesQuery } = timesApi;
