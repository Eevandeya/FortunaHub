import styles from './gallery_slider.module.css';
// eslint-disable-next-line camelcase
import slider_styles from '../slider.module.css';
import useCenterActiveSlide from '@hooks/useCenterActiveSlide.js';

const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
];

const GallerySlider = () => {
    const [targetsRef, rootRef, activeIndex] =
        useCenterActiveSlide('0px -45% 0px -45%');

    return (
        // eslint-disable-next-line camelcase
        <ul className={slider_styles.parallax_slider} ref={rootRef}>
            {images.map((image, index) => {
                return (
                    <li
                        key={image}
                        className={`${styles.gallery_el} ${index === activeIndex ? styles.closest_el : ''}`}
                        ref={(el) => {
                            if (el) {
                                targetsRef.current[index] = el;
                            }
                        }}>
                        <img
                            src={image}
                            className={`${styles.image} ${index === activeIndex ? styles.closest_image : ''}`}
                            width='600'
                            height='400'
                            alt='Изображение в галерее'
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default GallerySlider;
