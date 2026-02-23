import { useGetGalleryImagesQuery } from '@root.api/galleryApi.js';

const GalleryPage = () => {
    const { data: images } = useGetGalleryImagesQuery();

    return (
        <div className='container'>
            <h2>Галерея</h2>
            <div className='gallery-grid'>
                {images?.map((image) => {
                    const { display_name: displayName, image: imageUrl } =
                        image;

                    return (
                        <img
                            key={`${imageUrl}-galleryPage`}
                            src={`${import.meta.env.VITE_BACKEND_API_URL}${imageUrl}`}
                            className='image-1-1'
                            alt={`Изображение: ${displayName}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GalleryPage;
