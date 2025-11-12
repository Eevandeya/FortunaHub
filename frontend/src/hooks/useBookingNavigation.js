import { BOOKING_NAVIGATION } from '@root.consts/navigation.js';
import { useLocation } from 'react-router-dom';

export function useBookingNavigation() {
    const location = useLocation();
    const currentPath = location.pathname;

    const currentRoute = Object.values(BOOKING_NAVIGATION).find(
        (route) => route.path === currentPath
    );

    return currentRoute;
}
