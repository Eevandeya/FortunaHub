import api_handler from './api.js';

export const getAvailableTimes = async (date) => {
    try {
        const time_response = await api_handler.get(
            '/api/bookings/free-slots/',
            {
                params: {
                    date: date, // Передаем дату в URL для поиска времени по дате
                },
            }
        );

        return time_response.data?.free_slots ?? [];
    } catch (error) {
        return Promise.reject(error.message);
    }
};
