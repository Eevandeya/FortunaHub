import ProductReservation from '@components.features/goodsBooking/ProductReservation.jsx';

const GoodsBookingPage = () => {
    return (
        <>
            <div className='booking-main'>
                <header>
                    <h3>Выберите товары:</h3>
                </header>
                <div className='booking-content'>
                    <ProductReservation />
                </div>
            </div>
        </>
    );
};
export default GoodsBookingPage;
