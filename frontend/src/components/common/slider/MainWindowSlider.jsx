import { useEffect, useState } from 'react';
import styles from './slider.module.css';
import { useGetGalleryImagesQuery } from '../../../../api/galleryApi.js';

const MainWindowSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pause, setPause] = useState(false);
    const { data: images } = useGetGalleryImagesQuery();

    useEffect(() => {
        if (pause || !images) return;
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
            {images?.map((image, i) => {
                const { display_name: displayName, image: imageUrl } = image;

                return (
                    <img
                        key={`${imageUrl}-main`}
                        src={`${import.meta.env.VITE_BACKEND_API_URL}${imageUrl}`}
                        className={`${styles.image} ${i === activeIndex ? styles.active : ''} `}
                        alt={`Изображение: ${displayName}`}
                    />
                );
            })}

            <div className={styles.image_control}>
                {images?.map((image, i) => {
                    const { image: imageUrl } = image;

                    return (
                        <button
                            key={`${imageUrl}-button`}
                            onClick={() => changeSlide(i)}
                            className={`${styles.image_button} ${i === activeIndex ? styles.active : ''}`}
                        />
                    );
                })}
            </div>
        </article>
    );
};

export default MainWindowSlider;
