import { ErrorBookingContext } from './Context.js';
import { useState } from 'react';

const ErrorBookingProvider = ({ children }) => {
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
            {children}
        </ErrorBookingContext.Provider>
    );
};

export default ErrorBookingProvider;
