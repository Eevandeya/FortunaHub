import { useState } from 'react';
import { ErrorBoundaryContext } from './Context.js';

export const ErrorBoundaryProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    const addError = (error, level = 'component', context = {}) => {
        const errorEntry = {
            id: Date.now(),
            timeStamp: Date.now().toLocaleString(),
            level,
            error: error instanceof Error ? error : new Error(String(error)),
            context,
            stack: error.stack,
        };
        setErrors((prev) => [...prev, errorEntry]);
        console.error(`${level.toUpperCase()}`, error, context);
    };

    const clearError = (id) => {
        setErrors(errors.filter((error) => error.id === id));
    };
    const clearAllErrors = () => {
        setErrors([]);
    };

    return (
        <ErrorBoundaryContext.Provider
            value={{ errors, addError, clearError, clearAllErrors }}>
            {children}
        </ErrorBoundaryContext.Provider>
    );
};
