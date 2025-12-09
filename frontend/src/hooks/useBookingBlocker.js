import { matchPath, useBlocker } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';
import { useSelector } from 'react-redux';
import { selectItems } from '@store/itemsSlice.js';

export const useBookingBlocker = () => {
    const { time } = useSelector((state) => state.datetime);
    const items = useSelector(selectItems);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation, historyAction }) => {
            const nextValidations = {
                [ROUTES.BOOKING.TIME]: () =>
                    (!time?.start || !time?.end) && historyAction === 'PUSH',
                [ROUTES.BOOKING.GOODS]: () =>
                    items.length < 1 && historyAction === 'PUSH',
            };

            const previousValidation = {
                [ROUTES.BOOKING.GOODS]:
                    matchPath(ROUTES.BOOKING.TIME, nextLocation.pathname) &&
                    historyAction === 'PUSH',
            };
            if (previousValidation[currentLocation.pathname]) {
                return false;
            }
            const validationFn = nextValidations[currentLocation.pathname];
            return validationFn ? validationFn() : false;
        }
    );

    return blocker;
};
