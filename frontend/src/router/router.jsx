import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
} from 'react-router-dom';
import App from '../App.jsx';
import Homepage from '@pages/Homepage.jsx';
import TimeBookingPage from '@pages/TimeBookingPage.jsx';
import GoodsBookingPage from '@pages/GoodsBookingPage.jsx';
import PaymentPage from '@pages/PaymentPage.jsx';
import BookingLayout from '@components.layout/BookingLayout.jsx';

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<App />}>
            <Route index element={<Homepage />} />
            <Route path='booking' element={<BookingLayout />}>
                <Route path='time' element={<TimeBookingPage />} />
                <Route path='goods' element={<GoodsBookingPage />} />
                <Route path='payment' element={<PaymentPage />} />
            </Route>
        </Route>,
    ])
);

export default router;
