import { useContext } from 'react';
import { BookingContext } from '@context/Context.js';
import { useErrorHandler } from '@hooks/useErrorHandler';

export const useBooking = () => {
    const bookingContext = useContext(BookingContext);
    const { handleHookError } = useErrorHandler();

    try {
        if (!bookingContext) {
            throw new Error('Нет данных в bookings');
        }
        return bookingContext;
    } catch (error) {
        handleHookError(error, 'useBooking');
    }
};
