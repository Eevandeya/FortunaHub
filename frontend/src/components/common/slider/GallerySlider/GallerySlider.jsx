import styles from './gallery_slider.module.css';
// eslint-disable-next-line camelcase
import slider_styles from '../slider.module.css';
import useCenterActiveSlide from '@hooks/useCenterActiveSlide.js';
import Button from '../../button/Button.jsx';
import { useGetGalleryImagesQuery } from '../../../../../api/galleryApi.js';

const GallerySlider = () => {
    const { data: images } = useGetGalleryImagesQuery();
    const [targetsRef, rootRef, activeIndex] = useCenterActiveSlide(
        '0px -45% 0px -45%',
        images
    );

    return (
        // eslint-disable-next-line camelcase
        <ul className={slider_styles.parallax_slider} ref={rootRef}>
            {images?.slice(0, 6)?.map((image, index) => {
                const { display_name: displayName, image: imageUrl } = image;

                return (
                    <li
                        key={`${imageUrl}-gallery`}
                        className={`${styles.gallery_el} ${index === activeIndex ? styles.closest_el : ''}`}
                        ref={(el) => {
                            if (el) {
                                targetsRef.current[index] = el;
                            }
                        }}>
                        <img
                            src={`${import.meta.env.VITE_BACKEND_API_URL}${imageUrl}`}
                            className={`${styles.image} ${index === activeIndex ? styles.closest_image : ''}`}
                            width='600'
                            height='400'
                            alt={`Изображение: ${displayName}`}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default GallerySlider;
