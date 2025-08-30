import 'bulma/css/bulma.css';
import Time from '@components.features/TimeBookingPopup/Time.jsx';
import { ConfigProvider } from '@context/ConfigContext.jsx';
import AccesoriesRental from '@components.features/AccessoriesRentalPopup/AccesoriesRental.jsx';
import useModal from '@hooks/useModal.js';
import { ErrorBoundaryProvider } from '@context/ErrorBoundaryContext.jsx';
import { GlobalErrorBoundary } from '@components.features/ReactErrorBoundary/GlobalErrorBoundary.jsx';
import BookingProvider from '@context/BookingContext.jsx';
import BookingConfirm from '@components.features/BookingPopup/BookingConfirm.jsx';

function App() {
    const [modals, openModal, closeModal, closeAllModal] = useModal();

    return (
        <ErrorBoundaryProvider>
            <GlobalErrorBoundary>
                <ConfigProvider>
                    <BookingProvider>
                        <div className='container-fluid'>
                            <nav className='block navbar is-white'>
                                <header>
                                    <div className='navbar-brand'>
                                        <div className='navbar-burger'>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </header>
                            </nav>
                            <button
                                className='button is-primary'
                                onClick={() => openModal('time')}>
                                Time
                            </button>
                            <button
                                className='button is-light'
                                onClick={() => openModal('accessories')}>
                                Items
                            </button>
                            <button
                                className='button is-warning'
                                onClick={() => openModal('booking')}>
                                Items
                            </button>
                        </div>
                        <Time
                            modalActive={modals.time?.isActive}
                            setModalActive={() => closeModal('time')}
                        />
                        <AccesoriesRental
                            modalActive={modals.accessories?.isActive}
                            setModalActive={() => closeModal('accessories')}
                        />
                        <BookingConfirm
                            modalActive={modals.booking?.isActive}
                            setModalActive={() =>
                                closeModal('booking')
                            }></BookingConfirm>
                    </BookingProvider>
                </ConfigProvider>
            </GlobalErrorBoundary>
        </ErrorBoundaryProvider>
    );
}

export default App;
