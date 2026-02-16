import './styles/globals.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';

function App() {
    return (
        <>
            <ScrollRestoration getKey={(location) => location.pathname} />
            <Outlet />
        </>
    );
}

export default App;
