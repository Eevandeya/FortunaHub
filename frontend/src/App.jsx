import 'bulma/css/bulma.css';
import useModal from '@hooks/useModal.js';
import { ErrorBoundaryProvider } from '@context/ErrorBoundaryContext.jsx';
import { GlobalErrorBoundary } from '@components.features/ReactErrorBoundary/GlobalErrorBoundary.jsx';
import BookingDetail from '@components.features/BookingDetailPopup/BookingDetail.jsx';

function App() {
    const [modals, openModal, closeModal] = useModal();

    return (
        <ErrorBoundaryProvider>
            <GlobalErrorBoundary>
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
                        onClick={() => openModal('booking')}>
                        bookingDetail
                    </button>
                </div>
                <BookingDetail
                    modalActive={modals.booking?.isActive}
                    setModalActive={() => closeModal('booking')}
                />
            </GlobalErrorBoundary>
        </ErrorBoundaryProvider>
    );
}

export default App;
