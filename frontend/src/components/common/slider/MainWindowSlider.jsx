import { useEffect, useState } from 'react';
import styles from './slider.module.css';

const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
];

const MainWindowSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;
        const interval = setTimeout(() => {
            setActiveIndex((index) => {
                return (index + 1) % images.length;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, pause]);

    const changeSlide = (index) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    };

    return (
        <article
            onMouseDown={() => setPause(true)}
            onMouseUp={() => setPause(false)}
            className={styles.image_slider}>
            <span className={styles.hero_overlay}>
                <h1 className={styles.overlay_title}>Lorem Ipsum</h1>
                <p className={styles.overlay_subtitle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </span>
            {images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    className={`${styles.image} ${i === activeIndex ? styles.active : ''} `}
                    alt='Изображение бани'
                />
            ))}

            <div className={styles.image_control}>
                {images.map((key, i) => (
                    <button
                        key={key}
                        onClick={() => changeSlide(i)}
                        className={`${styles.image_button} ${i === activeIndex ? styles.active : ''}`}
                    />
                ))}
            </div>
        </article>
    );
};

export default MainWindowSlider;
