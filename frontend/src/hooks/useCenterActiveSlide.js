import { useEffect, useRef, useState } from 'react';

const useCenterActiveSlide = (rootMargin = '0px -45% 0px -45%') => {
    const targetsRef = useRef([]);
    const observerRef = useRef(null);
    const rootRef = useRef();
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);

                if (!visible.length) return;
                const rootRect = rootRef.current.getBoundingClientRect();
                const rootCenter = rootRect.left + rootRect.width / 2;
                let closest = null;
                let minDistance = Infinity;

                visible.forEach((entry) => {
                    const rect = entry.target.getBoundingClientRect();
                    const elCenter = rect.left + rect.width / 2;
                    const distance = Math.abs(elCenter - rootCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closest = entry.target;
                    }
                });

                const index = targetsRef.current.indexOf(closest);
                setActiveIndex(index);
            },
            { root: rootRef.current, rootMargin: rootMargin, threshold: 0 }
        );

        targetsRef.current.forEach((el) => observerRef.current.observe(el));

        return () => observerRef.current.disconnect();
    }, []);

    return [targetsRef, rootRef, activeIndex];
};

export default useCenterActiveSlide;
