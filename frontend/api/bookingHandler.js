import { baseApi } from './api.js';

const bookingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        setBooking: build.mutation({
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
            invalidatesTags: ['Booking'],
        }),
    }),
});

export const { useSetBookingMutation } = bookingApi;
