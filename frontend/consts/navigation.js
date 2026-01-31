export const ROUTES = {
    HOME: '/',
    HOME_HASH: '#',
    ABOUT: '#about',
    BOOKING: {
        BASE: '/booking',
        TIME: '/booking/time',
        GOODS: '/booking/goods',
        RESERVATION: '/booking/reservation',
    },
    STATUS: { SUCCESS: '/status/success' },
    SERVICES: {
        SAUNA: '/services/sauna',
        ACCESSORIES: '/services/accessories',
        GYM: '/services/gym',
    },
};

export const BOOKING_NAVIGATION = {
    time: {
        path: ROUTES.BOOKING.TIME,
        previous: ROUTES.HOME,
        next: ROUTES.BOOKING.GOODS,
        label: 'Выбор времени',
    },
    goods: {
        path: ROUTES.BOOKING.GOODS,
        previous: ROUTES.BOOKING.TIME,
        next: ROUTES.BOOKING.RESERVATION,
        label: 'Выбор товаров',
    },
    reservation: {
        path: ROUTES.BOOKING.RESERVATION,
        previous: ROUTES.BOOKING.GOODS,
        next: ROUTES.HOME,
        label: 'Оформление брони',
    },
    status: {
        path: ROUTES.STATUS.SUCCESS,
        previous: null,
        next: null,
        label: 'Статус брони',
    },
};
