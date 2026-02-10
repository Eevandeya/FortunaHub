import styles from './product_slider.module.css';
// eslint-disable-next-line camelcase
import slider_styles from '../slider.module.css';
import useCenterActiveSlide from '@hooks/useCenterActiveSlide.js';
import ProductSliderCard from './ProductSliderCard.jsx';

const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
];

//eslint-disable-next-line
const ProductSlider = (products = []) => {
    const [targetsRef, rootRef, activeIndex] =
        useCenterActiveSlide('0px -45% 0px -45%');

    return (
        <ul
            /* eslint-disable-next-line camelcase */
            className={`${slider_styles.parallax_slider} ${styles.product_slider}`}
            ref={rootRef}>
            {images.map((el, i) => {
                return (
                    <li
                        className={`${styles.product_el} ${i === activeIndex ? styles.closest_el : ''}`}
                        key={el}
                        ref={(e) => (targetsRef.current[i] = e)}>
                        <ProductSliderCard
                            image={images[i]}
                            cardIndex={i}
                            activeIndex={activeIndex}
                            title='Lorem Ipsum'
                            desc='Lorem ipsum dolor sit amet fhdf bdfb syfb sydf fnds fdsnh jfsdh fnsd bfhd sfds jbfd shfnd sjhb fsdhj fdfsfsd'
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ProductSlider;
