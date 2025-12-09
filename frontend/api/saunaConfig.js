import baseApi from './api.js';

/**
 * Configuration API for sauna application settings
 * @namespace configApi
 */
const configApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        /**
         * Fetch sauna configuration and settings
         * @returns {SaunaConfig} Application configuration
         */

        getSaunaConfig: build.query({ query: () => 'sauna-config/' }),
    }),
    overrideExisting: true,
});

/**
 * Hook for accessing sauna configuration
 * @returns {Object} Query result with configuration data
 */
export const { useGetSaunaConfigQuery } = configApi;
