import { ErrorBoundary } from 'react-error-boundary';
import { useErrorBoundary } from '@context/Context.js';

const ErrorFallback = ({error, resetErrorBoundary}) => {

    const { addError } = useErrorBoundary();

  return (
    <div role="alert" style={{ padding: '20px', background: '#ffe6e6', border: '1px solid red' }}>
      <h2>❗️ Что-то пошло не так</h2>
      <details>
        <summary>Подробности ошибки</summary>
        <pre>{error.message ?? "error"}</pre>
      </details>
      <button onClick={resetErrorBoundary}>Попробовать снова</button>
    </div>
  );
};

export const GlobalErrorBoundary = ({ children }) => {
  const onError = (error, info) => {
    console.error('Error Boundary поймал ошибку:', error, info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};