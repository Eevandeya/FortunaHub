import { matchPath, useBlocker } from 'react-router-dom';
import useBookingValidation from './useBookingValidation.js';
import { useBookingNavigation } from './useBookingNavigation.js';

export const useBookingBlocker = () => {
    const {
        validationSteps: isBookingFieldsValid,
        registerError,
        clearErrors,
    } = useBookingValidation();
    const currentRoute = useBookingNavigation();

    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        if (!isBookingFieldsValid[currentLocation.pathname]) {
            return false;
        }
        if (
            (matchPath(currentRoute?.next, nextLocation.pathname) &&
                !isBookingFieldsValid[currentLocation.pathname]?.valid) ||
            !isBookingFieldsValid[currentLocation.pathname]
        ) {
            registerError(isBookingFieldsValid[currentLocation.pathname]);
            return true;
        } else {
            clearErrors();
            return false;
        }
    });

    return blocker;
};
