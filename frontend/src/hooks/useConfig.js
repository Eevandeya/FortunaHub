import { useContext } from 'react';
import { ConfigContext } from '../context/Context.js';
import { useErrorHandler } from "./useErrorHandler.js"

export default function useConfig() {
  const config = useContext(ConfigContext);
  const {handleHookError} = useErrorHandler();
  try {
    if (!config) {
      throw new Error('Ошибка загрузки конфига')
    }
    return config;
  } catch (error) {
    handleHookError(error, "useConfig");
  }
}
