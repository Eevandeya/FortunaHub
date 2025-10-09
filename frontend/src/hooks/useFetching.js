import { useState, useCallback, useRef, useEffect } from 'react';

export function useFetching(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const fetching = useCallback(async () => {
        try {
            setIsLoading(true);
            await callbackRef.current();
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [callback]);

    return [fetching, isLoading];
}
