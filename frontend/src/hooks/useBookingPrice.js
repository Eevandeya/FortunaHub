import { useMemo, useEffect, useState } from 'react';
import { useGetBookingPriceQuery } from '@root.api/bookingPriceHandler.js';
import { PRICE_CALCULATION_NOTIFICATION } from '@root.consts/notificationTypes.js';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@store/bookingSelectors.js';
import TimeUtils from '@root.utils/timeUtils.js';
import { ROUTES } from '@root.consts/navigation.js';

export const useBookingPrice = (bookingData, currentLocation) => {
    const currentPrice = useSelector(selectTotalPrice);
    const [notification, setNotification] = useState(
        PRICE_CALCULATION_NOTIFICATION.IDLE
    );
    const queryParams = useMemo(() => {
        if (currentLocation !== ROUTES.BOOKING.RESERVATION) {
            return false;
        }
        const { items, dateTime } = bookingData;
        // eslint-disable-next-line camelcase
        const [start_datetime, end_datetime] = TimeUtils.concateDateTime(
            dateTime.time,
            dateTime.date
        );
        // eslint-disable-next-line camelcase
        if (!start_datetime || !end_datetime || !items?.length) {
            return null;
        }
        // eslint-disable-next-line camelcase
        return { start_datetime, end_datetime, items };
    }, [currentLocation]);

    const { data } = useGetBookingPriceQuery(queryParams || skipToken);

    const finalPrice = useMemo(() => {
        if (!data?.total) return currentPrice;
        return queryParams && currentPrice !== data.total
            ? data.total
            : currentPrice;
    }, [currentPrice, data?.total, currentLocation]);

    useEffect(() => {
        if (!queryParams) {
            setNotification(PRICE_CALCULATION_NOTIFICATION.IDLE);
            return;
        }

        if (!data) return;

        setNotification(
            currentPrice !== data.total
                ? PRICE_CALCULATION_NOTIFICATION.ERROR
                : PRICE_CALCULATION_NOTIFICATION.SUCCESS
        );
    }, [queryParams, data, currentPrice]);

    return [finalPrice, notification];
};
