import ProductReservation from '@components.features/goodsBooking/ProductReservation.jsx';
import { useContext, useRef } from 'react';
import { ErrorBookingContext } from '@context/Context.js';
import useScrollOnError from '@hooks/useScrollOnError.js';

const GoodsBookingPage = () => {
    const { invalidStep } = useContext(ErrorBookingContext);
    const itemsRef = useRef();

    useScrollOnError({ itemCards: itemsRef }, invalidStep);

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
