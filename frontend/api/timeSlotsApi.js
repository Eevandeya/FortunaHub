import api_handler from './api.js';

/**
 * Fetches available booking time slots for a specific date
 * @param {string|Date} date - Date to get available slots for (ISO string or Date object)
 * @returns {Promise<Array>} Promise resolving to array of free time slots
 * @throws {Promise<string>} Promise rejecting with error message if request fails
 * @example
 * // Get available slots for today
 * getAvailableTimes(new Date())
 *   .then(slots => console.log(slots))
 *   .catch(error => console.error(error));
 */
export const getAvailableTimes = async (date) => {
    try {
        const time_response = await api_handler.get(
            '/api/bookings/free-slots/',
            { params: { date: date } }
        );

        return time_response.data?.free_slots ?? [];
    } catch (error) {
        return Promise.reject(error.message);
    }
};
