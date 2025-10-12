import apiHandler from './api.js';

/**
 * Handles booking creation by sending booking data to the server
 * @param {Object} customer - Customer information object
 * @param {Array} items - Array of items to be booked
 * @param {Object} timeSlot - Time slot object for the booking
 * @param {string} timeSlot.start - Booking start datetime
 * @param {string} timeSlot.end - Booking end datetime
 * @param {number} visitorsCount - Number of visitors
 * @param {string} preferredContactMethod - Preferred contact method
 * @returns {Promise<Object>} Promise resolving to the API response object
 * @throws {Promise<Error>} Promise rejecting with error if booking creation fails
 * @example
 * // Create a new booking
 * bookingHandler(
 *   { name: 'John', phone: '+1234567890' },
 *   [{ id: 1, quantity: 2 }],
 *   { start: '10:00:00', end: '12:00:00' },
 *   4,
 *   'phone'
 * ).then(response => console.log('Booking created:', response))
 * .catch(error => console.error('Booking failed:', error));
 */
const bookingHandler = async (
    customer,
    items,
    timeSlot,
    visitorsCount,
    preferredContactMethod
) => {
    try {
        const request = await apiHandler.post(
            'api/bookings/create/',
            {
                customer: {
                    nickname: customer.nickname,
                    // eslint-disable-next-line camelcase
                    phone_number: customer.phoneNumber,
                },
                items,
                // eslint-disable-next-line camelcase
                start_datetime: timeSlot.start,
                // eslint-disable-next-line camelcase
                end_datetime: timeSlot.end,
                // eslint-disable-next-line camelcase
                visitors_count: visitorsCount,
                // eslint-disable-next-line camelcase
                preferred_contact_method: preferredContactMethod,
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return request;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default bookingHandler;
