import { useState, useCallback } from 'react';
import { useToast } from '@hooks';

export function useAsyncOperation(options = {}) {
  const { showToast = false } = options;
  const toast = useToast();
  
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
      
      if (showToast) {
        toast.success(`${errorContext || 'Operation'} completed successfully!`);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message ||
                          error.message || 
                          `An error occurred${errorContext ? ` during ${errorContext}` : ''}`;
      
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      
      if (showToast) {
        toast.error(errorMessage);
      }
      
      throw error;
    }
  }, [showToast, toast]);

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

export function useAsyncForm(submitHandler, options = {}) {
  const { showToast = false } = options;
  const asyncOp = useAsyncOperation({ showToast });

  const handleSubmit = useCallback(async (data) => {
    try {
      const result = await asyncOp.execute(() => submitHandler(data));
      return result;
    } catch {
      return null;
    }
  }, [asyncOp, submitHandler]);

  return {
    ...asyncOp,
    handleSubmit
  };
}