import { useState, useCallback } from 'react';

export const handleApiError = (error) => {
  if (error.response?.status === 422) {
    const validationErrors = error.response?.data?.detail;
    if (Array.isArray(validationErrors)) {
      const errorMessages = validationErrors
        .map((error) => `${error.loc?.join(".")}: ${error.msg}`)
        .join(", ");
      return `Validation Error: ${errorMessages}`;
    }
    return "Validation Error: Invalid format";
  }
  
  return error.response?.data?.detail || error.response?.data?.message || error.message || 'An unexpected error occurred';
};

export const createApiErrorHandler = (setError, setLoading, options = {}) => {
  const { clearOtherStates = [] } = options;
  
  return (error) => {
    clearOtherStates.forEach(setState => setState(null));
    
    const message = handleApiError(error);
    setError(message);
    
    if (setLoading) {
      setLoading(false);
    }
  };
};

export const handleAsyncOperation = async (operation, handlers) => {
  const { 
    setLoading, 
    setError, 
    onSuccess, 
    onFinally,
    onPending,
    clearStatesOnStart = [],
    context = ''
  } = handlers;
  
  if (setLoading) setLoading(true);
  if (setError) setError(null);
  clearStatesOnStart.forEach(setState => setState(null));
  
  try {
    const result = await operation();
    if (onSuccess) {
      onSuccess(result);
    }
    return result;
  } catch (error) {
    if (isAsyncOperationPending(error)) {
      const message = getPianistaStatusMessage(error, context);
      if (onPending) {
        onPending(message);
      } else if (setError) {
        setError(message);
      }
      return;
    }
    
    const message = getPianistaStatusMessage(error, context) || handleApiError(error);
    if (setError) {
      setError(message);
    }
    throw error;
  } finally {
    if (setLoading) setLoading(false);
    if (onFinally) onFinally();
  }
};

export const createFormSubmissionHandler = (apiCall, stateHandlers, options = {}) => {
  const { 
    setLoading, 
    setError, 
    setResult, 
    setJobId,
    onSuccess 
  } = stateHandlers;
  
  const { context = 'submission' } = options;

  return async (formData) => {
    await handleAsyncOperation(
      () => apiCall(formData),
      {
        setLoading,
        setError,
        clearStatesOnStart: [setResult, setJobId].filter(Boolean),
        context,
        onSuccess: (response) => {
          const { data } = response;
          
          if (data?.id && setJobId) {
            setJobId(data.id);
          }
          
          if (setResult) {
            setResult(data);
          }
          
          if (onSuccess) {
            onSuccess(data);
          }
        }
      }
    );
  };
};

export const useAsyncOperation = (initialState = {}) => {
  const {
    loading = false,
    error = null,
    result = null
  } = initialState;

  const [state, setState] = useState({
    loading,
    error,
    result
  });

  const execute = useCallback(async (operation) => {
    return handleAsyncOperation(
      operation,
      {
        setLoading: (loading) => setState(prev => ({ ...prev, loading })),
        setError: (error) => setState(prev => ({ ...prev, error })),
        onSuccess: (result) => setState(prev => ({ ...prev, result }))
      }
    );
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, result: null });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
};

export const getPianistaStatusMessage = (error, context = '') => {
  if (!error.response) {
    return `Network error${context ? ` during ${context}` : ''}. Please check your connection.`;
  }

  const { status, data } = error.response;
  const baseContext = context ? ` ${context}` : '';

  switch (status) {
    case 200:
      return null;
    case 201:
      return null;
    case 202:
      if (context.includes('plan')) {
        return 'Planning process is still ongoing. Please check back later to retrieve the plan once it is complete.';
      } else if (context.includes('solve')) {
        return 'Solution is still being processed. Please check back later.';
      }
      return `${context || 'Operation'} is still processing. Please check back later.`;
    case 404:
      if (context.includes('plan')) {
        return data?.detail || 'Plan not found.';
      } else if (context.includes('solve')) {
        return data?.detail || 'Solution not found.';
      }
      return data?.detail || `${context || 'Resource'} not found.`;
    case 422:
      return handleApiError(error);
    case 429:
      return `Too many requests${baseContext}. Please wait a moment and try again.`;
    case 500:
      return `Server error${baseContext}. Please try again later.`;
    case 503:
      return `Service temporarily unavailable${baseContext}. Please try again later.`;
    default:
      return data?.detail || data?.message || `Error ${status}${baseContext}`;
  }
};

export const isAsyncOperationPending = (error) => {
  return error.response?.status === 202;
};

export const isSuccessResponse = (status) => {
  return status === 200 || status === 201;
};

export const createJobSubmissionHandler = (apiCall, pollingHook, stateHandlers, options = {}) => {
  const { 
    setLoading, 
    setError, 
    setJobId,
    onSuccess 
  } = stateHandlers;
  
  const { context = 'job submission' } = options;

  return async (formData) => {
    if (setLoading) setLoading(true);
    if (setError) setError(null);
    if (setJobId) setJobId(null);

    try {
      const { data, status } = await apiCall(formData);
      
      if (status === 202) {
        if (setJobId) setJobId(data.id);
        pollingHook.startPolling(data.id);
        if (setLoading) setLoading(false);
        return data;
      } else if (isSuccessResponse(status)) {
        if (onSuccess) onSuccess(data);
        if (setLoading) setLoading(false);
        return data;
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    } catch (error) {
      const message = getPianistaStatusMessage(error, context) || handleApiError(error);
      if (setError) setError(message);
      if (setLoading) setLoading(false);
      throw error;
    }
  };
};