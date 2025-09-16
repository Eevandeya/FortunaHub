import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reduxStore from '@store/reduxStore';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <Provider store={reduxStore}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>
);
