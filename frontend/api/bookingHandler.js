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
         * @param {BookingRequestData} bookingData - Booking creation data
         * @returns {Promise<Booking>} Promise resolving to created booking
         */
        setBooking: build.mutation({
            /**
             * @name query
             * @type {Function}
             * @param {BookingRequestData} bookingData - Input data for booking creation
             * @returns {Object} Fetch API configuration object
             * @description Constructs the HTTP request for booking creation
             */
            query: (bookingData) => ({
                url: 'bookings/create/',
                method: 'POST',
                body: {
                    customer: {
                        nickname: bookingData.customer?.nickname,
                        //eslint-disable-next-line camelcase
                        phone_number: bookingData.customer?.phoneNumber,
                    },
                    items: bookingData.items,
                    // eslint-disable-next-line camelcase
                    start_datetime: bookingData.timeSlot?.start,
                    // eslint-disable-next-line camelcase
                    end_datetime: bookingData.timeSlot?.end,
                    // eslint-disable-next-line camelcase
                    visitors_count: bookingData.visitorsCount,
                    // eslint-disable-next-line camelcase
                    preferred_contact_method:
                        bookingData.preferredContactMethod,
                    // eslint-disable-next-line camelcase
                    payment_option: bookingData.paymentMethod,
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

export default bookingApi;

export const { useSetBookingMutation } = bookingApi;
