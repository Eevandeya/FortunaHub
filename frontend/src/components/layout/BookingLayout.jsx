import { Outlet } from 'react-router-dom';
import { StepsBar } from '@components.common/progressSteps/StepsBar.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import { Sidebar } from '@components.layout/Sidebar.jsx';
import { useBookingNavigation } from '@hooks/useBookingNavigation.js';
import { GoodsInfoCard } from '@components.features/bookingInfoCards/GoodsInfoCard.jsx';
import { TimeInfoCard } from '@components.features/bookingInfoCards/TimeInfoCard.jsx';
import { useBookingBlocker } from '@hooks/useBookingBlocker.js';
import { PriceInfoCard } from '@components.features/bookingInfoCards/PriceInfoCard.jsx';
import FortunaLogo from '@components.common/logo/FortunaLogo.jsx';
import { NavigationItem } from '@components.common/navigation/NavigationItem.jsx';

const BookingLayout = () => {
    const steps = [
        { to: ROUTES.BOOKING.TIME, number: 1 },
        { to: ROUTES.BOOKING.GOODS, number: 2 },
        { to: ROUTES.BOOKING.RESERVATION, number: 3 },
    ];
    const blocker = useBookingBlocker();
    const navigation = useBookingNavigation();

    return (
        <>
            <header>
                <nav>
                    <div className='navbar booking-navbar'>
                        <div className='booking-navbar-content'>
                            <FortunaLogo
                                logoHeader='FORTUNA'
                                logoImage='/icons/Fortuna%2064x64.svg'
                                hasHeader
                                id='booking-header'
                            />
                        </div>
                        <div className='navbar-left'>
                            <NavigationItem id='to-main' to={ROUTES.HOME} end>
                                На главную
                            </NavigationItem>
                        </div>
                    </div>
                </nav>
            </header>
            <div className='booking-container'>
                <StepsBar steps={steps} />
                <main>
                    <Outlet />
                    {blocker.state === 'blocked' && (
                        <div>
                            <button
                                style={{ backgroundColor: 'white' }}
                                onClick={() => {
                                    blocker.reset();
                                }}>
                                Остаться
                            </button>
                            <button
                                style={{ backgroundColor: 'white' }}
                                onClick={() => {
                                    blocker.proceed();
                                }}>
                                Перейти
                            </button>
                        </div>
                    )}
                </main>
                <Sidebar paths={navigation}>
                    <TimeInfoCard />
                    <GoodsInfoCard />
                    <PriceInfoCard navigation={navigation} />
                </Sidebar>
            </div>
        </>
    );
};

export default BookingLayout;
