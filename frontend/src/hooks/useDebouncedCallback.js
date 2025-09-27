import { useRef, useCallback, useEffect } from 'react';

export function useDebouncedCallback(callback, delay) {
    const timeoutRef = useRef();
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const debouncedCallback = useCallback(
        (...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        },
        [delay]
    );

    debouncedCallback.cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return debouncedCallback;
}
