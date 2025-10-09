import { useState, useEffect } from 'react';
import { getSaunaConfig } from '@root.api/saunaConfig.js';
import { ConfigContext } from '@context/Context.js';

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const config = await getSaunaConfig();
                setConfig(config);
            } catch (error) {
                setError(error.message);
            }
        };
        loadConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, error }}>
            {children}
        </ConfigContext.Provider>
    );
}
