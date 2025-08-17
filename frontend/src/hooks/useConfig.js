import { useContext } from 'react';
import { ConfigContext } from '../context/Context.js';

export default function useConfig() {
  const config = useContext(ConfigContext);

  if (!config) {
    return Promise.reject(new Error('There are no parameters added'));
  }
  return config;
}
