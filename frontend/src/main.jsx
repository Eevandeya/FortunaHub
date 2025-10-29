import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reduxStore from '@store/reduxStore';
import router from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={reduxStore}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
