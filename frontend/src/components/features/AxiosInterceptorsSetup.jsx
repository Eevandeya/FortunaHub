import {
    requestErrorInterceptor,
    responseErrorInterceptor,
} from '@root.api/apiErrorHandler.js';
import apiHandler from '@root.api/api.js';
import { useErrorBoundary } from '@context/Context.js';
import { useEffect } from 'react';

function AxiosInterceptorsSetup() {
    const { addError } = useErrorBoundary();

    useEffect(() => {
        requestErrorInterceptor(apiHandler, addError);
        responseErrorInterceptor(apiHandler, addError);
    }, [addError]);

    return null;
}

export default AxiosInterceptorsSetup;
