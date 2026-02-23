import baseApi from './api.js';

export const galleryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getGalleryImages: build.query({
            query: () => 'sauna-gallery/',
            providesTags: ['Gallery'],
        }),
    }),
    overrideExisting: true,
});

export const { useGetGalleryImagesQuery } = galleryApi;
