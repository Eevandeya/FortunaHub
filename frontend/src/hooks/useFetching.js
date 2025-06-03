import { useState } from 'react';

export function useFetching(callback) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
}
