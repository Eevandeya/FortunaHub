import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
    Navigate,
} from 'react-router-dom';
import App from '../App.jsx';
import Homepage from '@pages/Homepage.jsx';
import TimeBookingPage from '@pages/TimeBookingPage.jsx';
import GoodsBookingPage from '@pages/GoodsBookingPage.jsx';
import ReservationPage from '@pages/ReservationPage.jsx';
import BookingLayout from '@components.layout/BookingLayout.jsx';

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<App />}>
            <Route index element={<Homepage />} />
            <Route path='booking' element={<BookingLayout />}>
                <Route index element={<Navigate to='time' replace />} />
                <Route path='time' element={<TimeBookingPage />} />
                <Route path='goods' element={<GoodsBookingPage />} />
                <Route path='reservation' element={<ReservationPage />} />
            </Route>
        </Route>,
    ])
);

export default router;
