import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reduxStore from '@store/reduxStore';
import router from '@/router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundaryProvider } from '@context/ErrorBoundaryContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundaryProvider>
            <Provider store={reduxStore}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorBoundaryProvider>
    </StrictMode>
);
