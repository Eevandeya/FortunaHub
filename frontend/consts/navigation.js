export const ROUTES = {
    HOME: '/',
    ABOUT: '#about',
    BOOKING: {
        BASE: '/booking',
        TIME: '/booking/time',
        GOODS: '/booking/goods',
        RESERVATION: '/booking/reservation',
    },
};

export const BOOKING_NAVIGATION = {
    time: {
        path: '/booking/time',
        previous: '/',
        next: '/booking/goods',
        label: 'Выбор времени',
    },
    goods: {
        path: '/booking/goods',
        previous: '/booking/time',
        next: '/booking/reservation',
        label: 'Выбор товаров',
    },
    reservation: {
        path: '/booking/reservation',
        previous: '/booking/goods',
        next: '/booking/reservation',
        label: 'Оформление брони',
    },
};
