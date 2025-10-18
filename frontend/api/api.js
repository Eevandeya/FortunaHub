import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

/**
 * Base API client for RTK Query
 * @type {import('@reduxjs/toolkit/query').CreateApiOptions}
 */
export const baseApi = createApi({
    /** @type {string} Path in Redux store */
    reducerPath: 'api',
    /** @type {string[]} Tags for cache invalidation */
    tagTypes: ['Booking'],
    /** @type {Object} Base query configuration */
    baseQuery: fetchBaseQuery({
        /** @type {string} Base API URL */
        baseUrl: `${BACKEND_API_URL}/api/`,
        /**
         * @param {Headers} headers
         * @returns {Headers}
         */
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    /**
     * @param {import('@reduxjs/toolkit/query').Builder} builder
     * @returns {Object}
     */
    endpoints: () => ({}),
});

export default baseApi;
