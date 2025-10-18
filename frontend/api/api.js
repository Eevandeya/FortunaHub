import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Booking'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API_URL}/api/`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default baseApi;
