import { useState, useCallback, useEffect } from 'react';

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

export const useApiCall = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

export const useApiData = (apiCall) => {
  const { data, loading, error, execute } = useApiCall(apiCall);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  // Auto-execute on mount
  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
};