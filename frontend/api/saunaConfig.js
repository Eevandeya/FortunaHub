import baseApi from './api.js';

const configApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSaunaConfig: build.query({ query: () => 'config/' }),
    }),
    overrideExisting: true,
});

export const { useGetSaunaConfigQuery } = configApi;
