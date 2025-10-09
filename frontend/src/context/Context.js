import { createContext, useContext } from 'react';

export const ErrorBoundaryContext = createContext(null);
export const ConfigContext = createContext(null);

export const useErrorBoundary = () => useContext(ErrorBoundaryContext);
export const BookingContext = createContext(null);
