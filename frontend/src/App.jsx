import './styles/globals.css';
import { ErrorBoundaryProvider } from '@context/ErrorBoundaryContext.jsx';
import { GlobalErrorBoundary } from '@components.features/ReactErrorBoundary/GlobalErrorBoundary.jsx';
import { Outlet } from 'react-router-dom';

function App() {
    return <Outlet />;
}

export default App;
