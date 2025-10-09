import {
    requestErrorInterceptor,
    responseErrorInterceptor,
} from '@root.api/apiErrorHandler.js';
import api_handler from '@root.api/api.js';
import { useErrorBoundary } from '@context/Context.js';
import { useEffect } from 'react';

function AxiosInterceptorsSetup() {
    const { addError } = useErrorBoundary();

    useEffect(() => {
        requestErrorInterceptor(api_handler, addError);
        responseErrorInterceptor(api_handler, addError);
    }, [addError]);

    return null;
}

export default AxiosInterceptorsSetup;
