import api_handler from './api.js';

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
            {
                headers: {
                    'Content-Type': 'application/json', // Если отправляете JSON. Благодаря этому загаловку сервер будет парсить как данные как JSON.
                },
            }
        );
        return request;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default bookingHandler;
