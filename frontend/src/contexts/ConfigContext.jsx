import { createContext, useState, useEffect, useContext} from 'react';
import getSaunaConfig from '../api/saunaConfig.js';


const ConfigContext = createContext(null)

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(null)
    const [error, setError] = useState('')

    useEffect( () => {
        const loadConfig = async () => {
            try {
                await getSaunaConfig().then(response => setConfig(response))
            } catch (er) {
                if (typeof er === 'string') {
                    setError(er)
                } else {
                    setError(er.message)
                }
            }
        }
        loadConfig();
    }, [])

    return (
      <ConfigContext.Provider value={{config, error}}>
          {children}
      </ConfigContext.Provider>
    )
}

export function useConfig(){
    const config = useContext(ConfigContext)
    if (!config) {
        return Promise.reject(new Error('There are no parameters added'))
    }
    return config;
}