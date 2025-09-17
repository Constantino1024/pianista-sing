import { useState, useCallback } from 'react';

/**
 * Hook for managing async operations with loading, error, and result states
 * Works well with the new UI components (LoadingSpinner, ErrorDisplay, ResultDisplay)
 */
export function useAsyncOperation() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    result: null
  });

  const execute = useCallback(async (operation, errorContext = '') => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await operation();
      setState(prev => ({ ...prev, loading: false, result }));
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message ||
                          error.message || 
                          `An error occurred${errorContext ? ` during ${errorContext}` : ''}`;
      
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error; // Re-throw so calling code can handle if needed
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, result: null });
  }, []);

  const setResult = useCallback((result) => {
    setState(prev => ({ ...prev, result }));
  }, []);

  const setError = useCallback((error) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setResult,
    setError,
    setLoading
  };
}

/**
 * Hook for managing form submission with async operations
 * Integrates with react-hook-form and provides consistent state management
 */
export function useAsyncForm(submitHandler) {
  const asyncOp = useAsyncOperation();

  const handleSubmit = useCallback(async (data) => {
    try {
      const result = await asyncOp.execute(() => submitHandler(data));
      return result;
    } catch {
      // Error is already handled by asyncOp.execute
      return null;
    }
  }, [asyncOp, submitHandler]);

  return {
    ...asyncOp,
    handleSubmit
  };
}