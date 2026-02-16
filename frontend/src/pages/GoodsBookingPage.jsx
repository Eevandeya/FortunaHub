import ProductReservation from '@components.features/goodsBooking/ProductReservation.jsx';
import { useContext, useEffect, useRef } from 'react';
import { ErrorBookingContext } from '../context/Context.js';

const GoodsBookingPage = () => {
    const { invalidStep } = useContext(ErrorBookingContext);
    const itemsRef = useRef();

    useEffect(() => {
        if (!invalidStep.error || invalidStep.error.pageId !== 'goods') return;

        const el = itemsRef.current;
        requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            window.scrollBy({ top: rect.bottom, behavior: 'smooth' });
        });
    }, [invalidStep]);

    return (
        <>
            <div className='booking-main'>
                <div className='booking-content' ref={itemsRef}>
                    <header>
                        <h5>Выберите товары</h5>
                    </header>
                    <ProductReservation
                        hasError={invalidStep.error?.place === 'itemCards'}
                        error={invalidStep.error?.message}
                    />
                </div>
            </div>
        </>
    );
};
export default GoodsBookingPage;
