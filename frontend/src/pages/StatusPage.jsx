import { Outlet, useNavigation } from 'react-router-dom';
import Loading from '@components.common/loader/Loading.jsx';

const StatusPage = () => {
    const { state } = useNavigation();

    if (state === 'loading') {
        return <Loading />;
    }

    return (
        <div className='container status'>
            <Outlet />
        </div>
    );
};

export default StatusPage;
