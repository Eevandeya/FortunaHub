export const ROUTES = {
    HOME: '/',
    PRICE: '/price',
    GALLERY: '/gallery',
    BOOKING: {
        BASE: '/booking',
        TIME: '/booking/time',
        GOODS: '/booking/goods',
        RESERVATION: '/booking/reservation',
        STATUS: {
            BASE: '/booking/status/:orderNumber',
            UNPAID: '/booking/status/:orderNumber/unpaid',
        },
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
        next: ROUTES.BOOKING.RESERVATION,
        label: 'Оформление брони',
    },
    status: {
        path: ROUTES.BOOKING.STATUS.BASE,
        previous: null,
        next: null,
        label: 'Статус брони',
    },
};
