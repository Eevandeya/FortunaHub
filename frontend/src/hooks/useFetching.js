import { useState } from 'react';

export function useFetching(callback) {

  const [isLoading, setIsLoading] = useState(false);

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error) {
      throw new Error(error.message)
    }
    finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading];
}
