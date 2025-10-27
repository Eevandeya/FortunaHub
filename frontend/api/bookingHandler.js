import baseApi from './api.js';

/**
 * Booking API extension with mutation endpoints for booking operations.
 * Extends the base API with booking-specific functionality
 */
const bookingApi = baseApi.injectEndpoints({
    /**
     * @name endpoints
     * @type {Function}
     * @param {import('@reduxjs/toolkit/query').Builder} build - RTK Query builder instance
     * @returns {Object} Endpoints configuration object
     * @description Defines booking-related API endpoints
     */
    endpoints: (build) => ({
        /**
         * Creates a new booking in the system
         * @method setBooking
         * @type {import('@reduxjs/toolkit/query').MutationDefinition}
         *
         * @param {BookingRequestData} consumerData - Booking creation data
         * @returns {Promise<Booking>} Promise resolving to created booking
         */
        setBooking: build.mutation({
            /**
             * @name query
             * @type {Function}
             * @param {BookingRequestData} consumerData - Input data for booking creation
             * @returns {Object} Fetch API configuration object
             * @description Constructs the HTTP request for booking creation
             */
            query: (consumerData) => ({
                url: 'bookings/create/',
                method: 'POST',
                body: {
                    customer: {
                        nickname: consumerData['customer'].nickname,
                        //eslint-disable-next-line camelcase
                        phone_number: consumerData['customer'].phoneNumber,
                    },
                    items: consumerData['items'],
                    // eslint-disable-next-line camelcase
                    start_datetime: consumerData.timeSlot.start,
                    // eslint-disable-next-line camelcase
                    end_datetime: consumerData.timeSlot.end,
                    // eslint-disable-next-line camelcase
                    visitors_count: consumerData['visitorsCount'],
                    // eslint-disable-next-line camelcase
                    preferred_contact_method:
                        consumerData['preferredContactMethod'],
                },
            }),
            /**
             * @name invalidatesTags
             * @type {Array<string>}
             * @description Tags to invalidate when this mutation succeeds
             * Invalidates 'Booking' tag to trigger refetch of booking lists
             */
            invalidatesTags: ['Booking'],
        }),
    }),
});

export const { useSetBookingMutation } = bookingApi;
