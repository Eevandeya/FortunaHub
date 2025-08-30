import {BookingContext} from '@context/Context.js';
import { useContext } from 'react';

export const useBooking = () => {
    const bookingContext = useContext(BookingContext);

    try {
        if (!bookingContext) {
            throw new Error('Нет данных в bookings');
        }
        return bookingContext;
    } catch(error) {
        return Promise.reject(error)
    }
}

