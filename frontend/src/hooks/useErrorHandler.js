import { useErrorBoundary } from '@context/Context.js';
import { useCallback } from 'react';

export const useErrorHandler = () => {
    const { addError } = useErrorBoundary();

    const handleError = useCallback(
        (error, level = 'component', context = {}) => {
            addError(error, level, context);
        },
        [addError]
    );

    const handleApiError = useCallback(
        (error, context = {}) => {
            addError(error, 'api', context);
        },
        [addError]
    );

    const handleHookError = useCallback(
        (error, hookName, context = {}) => {
            addError(error, 'hook', { ...context, hook: hookName });
        },
        [addError]
    );

    return { handleError, handleApiError, handleHookError };
};
