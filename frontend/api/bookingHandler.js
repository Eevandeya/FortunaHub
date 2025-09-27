import api_handler from './api.js';

/**
 * Handles booking creation by sending booking data to the server
 * @param {Object} customer - Customer information object
 * @param {Array} items - Array of items to be booked
 * @param {Object} timeSlot - Time slot object for the booking
 * @param {string} timeSlot.start - Booking start datetime
 * @param {string} timeSlot.end - Booking end datetime
 * @param {number} visitors_count - Number of visitors
 * @param {string} preferred_contact_method - Preferred contact method
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
    visitors_count,
    preferred_contact_method
) => {
    try {
        const request = await api_handler.post(
            'api/bookings/create/',
            {
                customer,
                items,
                start_datetime: timeSlot.start,
                end_datetime: timeSlot.end,
                visitors_count,
                preferred_contact_method,
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return request;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default bookingHandler;
