import styles from './product_slider.module.css';
// eslint-disable-next-line camelcase
import slider_styles from '../slider.module.css';
import useCenterActiveSlide from '@hooks/useCenterActiveSlide.js';
import ProductSliderCard from './ProductSliderCard.jsx';
import { useGetItemsQuantityQuery } from '../../../../../api/rentingItemsApi.js';

//eslint-disable-next-line
const ProductSlider = (products = []) => {
    const { data: items } = useGetItemsQuantityQuery();
    const [targetsRef, rootRef, activeIndex] = useCenterActiveSlide(
        '0px -45% 0px -45%',
        items
    );

    return (
        <ul
            /* eslint-disable-next-line camelcase */
            className={`${slider_styles.parallax_slider} ${styles.product_slider}`}
            ref={rootRef}>
            {items?.map((item, i) => {
                const {
                    display_name: displayName,
                    description,
                    image: imageUrl,
                } = item;

                return (
                    <li
                        className={`${styles.product_el} ${i === activeIndex ? styles.closest_el : ''}`}
                        key={`${imageUrl}-product`}
                        ref={(e) => (targetsRef.current[i] = e)}>
                        <ProductSliderCard
                            image={`${import.meta.env.VITE_BACKEND_API_URL}${imageUrl}`}
                            cardIndex={i}
                            activeIndex={activeIndex}
                            title={displayName}
                            desc={description}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ProductSlider;
