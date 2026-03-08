import { ErrorBookingContext } from './Context.js';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const ErrorBookingProvider = () => {
    const [invalidStep, setInvalidStep] = useState({});

    const registerError = (errorPageObj) => {
        setInvalidStep({ ...errorPageObj });
    };

    const clearErrors = () => {
        setInvalidStep({});
    };

    return (
        <ErrorBookingContext.Provider
            value={{ invalidStep, registerError, clearErrors }}>
            <Outlet />
        </ErrorBookingContext.Provider>
    );
};

export default ErrorBookingProvider;
