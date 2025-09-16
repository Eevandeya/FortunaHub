import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DJANGO_API_URL = import.meta.env.VITE_DJANGO_API_URL;

export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Booking'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${DJANGO_API_URL}/api/`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('X-API-KEY', 'api-secret-key');
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default baseApi;
