import { createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import App from '../App.jsx';
import Homepage from '@pages/Homepage.jsx';
import TimeBookingPage from '@pages/TimeBookingPage.jsx';
import GoodsBookingPage from '@pages/GoodsBookingPage.jsx';
import ReservationPage from '@pages/ReservationPage.jsx';
import BookingLayout from '@components.layout/BookingLayout.jsx';
import { NotFoundPage } from '@pages/ErrorPage.jsx';
import { SuccessStatusPage } from '../pages/StatusPage.jsx';
import PricingLayout from '../components/layout/PricingLayout.jsx';

const routes = createRoutesFromElements([
    <Route path='/' element={<App />}>
        <Route index element={<Homepage />} />
        <Route
            path='booking'
            element={
                <PricingLayout>
                    <BookingLayout />
                </PricingLayout>
            }>
            <Route index element={<Navigate to='time' replace />} />
            <Route path='time' element={<TimeBookingPage />} />
            <Route path='goods' element={<GoodsBookingPage />} />
            <Route path='reservation' element={<ReservationPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='status'>
            <Route path='success' element={<SuccessStatusPage />} />
        </Route>
    </Route>,
]);

export default routes;
