import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollOnRoute = () => {
    const location = useLocation();

    useEffect(() => {
        const scroll = location.state?.scrollTo;
        if (!scroll) return;

        const el = document.getElementById(scroll.id);
        if (!el) return;

        el.scrollIntoView({
            behavior: 'smooth',
            block: scroll.options?.block ?? 'start',
        });
    }, [location]);
};

export default useScrollOnRoute;
