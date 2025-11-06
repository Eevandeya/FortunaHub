import ReservationForm from '@components.features/customerBooking/ReservationForm.jsx';

const ReservationPage = () => {
    return (
        <>
            <div className='booking-main'>
                <header>
                    <h3>Введите персональные данные:</h3>
                </header>
                <div className='booking-content'>
                    <ReservationForm />
                </div>
            </div>
        </>
    );
};
export default ReservationPage;
