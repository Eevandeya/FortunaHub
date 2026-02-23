import { useEffect } from 'react';

const useScrollOnError = (elRefs, invalidStep) => {
    useEffect(() => {
        if (!invalidStep) return;

        if (!elRefs[`${invalidStep.error?.place}`]) return;

        const el = elRefs[invalidStep.error.place]?.current;

        if (!el) return;

        requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            window.scrollBy({ top: rect.bottom, behavior: 'smooth' });
        });
    }, [invalidStep]);
};

export default useScrollOnError;
