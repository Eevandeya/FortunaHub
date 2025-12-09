import baseApi from '@root.api/api.js';

const pricingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPricing: build.query({ query: () => 'pricing/' }),
    }),
    overrideExisting: true,
});

export const { useGetPricingQuery } = pricingApi;
