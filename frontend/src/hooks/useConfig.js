import { useContext } from 'react';
import { ConfigContext } from '@context/Context.js';
import { useErrorHandler } from '@hooks/useErrorHandler.js';

export default function useConfig() {
    const response = useContext(ConfigContext);
    const { handleHookError } = useErrorHandler();
    try {
        if (!response) {
            throw new Error('Error loading config');
        }
        return { config: response.config?.data, error: response.error };
    } catch (error) {
        handleHookError(error, 'useConfig');
    }
}
