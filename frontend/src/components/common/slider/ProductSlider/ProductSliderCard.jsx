import styles from './product_slider.module.css';
import Card from '@components.common/card/Card.jsx';

export default function ProductSliderCard({
    cardIndex,
    activeIndex,
    image,
    title,
    desc,
}) {
    return (
        <Card
            Component='article'
            className={`${styles.product_card} ${cardIndex === activeIndex ? styles.closest_card : ''}`}>
            <img src={image} className={styles.image} alt='Карточка товара' />
            <div className={styles.content}>
                <h5 className={styles.title}>{title}</h5>
                <p className={styles.subtitle}>{desc}</p>
            </div>
        </Card>
    );
}
