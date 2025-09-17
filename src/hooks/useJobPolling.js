import { useState, useCallback, useRef, useEffect } from 'react';
import { config } from '@config/environment';

export const useJobPolling = (fetchFunction, options = {}) => {
  const {
    initialInterval = config.features.ui.autoRefreshInterval,
    maxInterval = 30000,
    maxAttempts = 20,
    backoffMultiplier = 1.5,
    onSuccess,
    onError,
    onPending,
    enabled = true
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [nextPollIn, setNextPollIn] = useState(null);

  const timeoutRef = useRef(null);
  const currentIntervalRef = useRef(initialInterval);
  const isActiveRef = useRef(true);

  const getNextInterval = useCallback((currentAttempt) => {
    const nextInterval = Math.min(
      initialInterval * Math.pow(backoffMultiplier, currentAttempt),
      maxInterval
    );
    return Math.floor(nextInterval);
  }, [initialInterval, maxInterval, backoffMultiplier]);

  const startCountdown = useCallback((interval) => {
    setNextPollIn(Math.ceil(interval / 1000));
    
    const countdownInterval = setInterval(() => {
      setNextPollIn(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const executeFetch = useCallback(async (jobId, isInitialCall = false) => {
    if (!enabled || !jobId) return;

    if (isInitialCall) {
      setLoading(true);
      setError(null);
      setData(null);
      setAttemptCount(0);
      currentIntervalRef.current = initialInterval;
    }

    try {
      const response = await fetchFunction(jobId);
      
      if (response.status === 200 || response.status === 201) {
        setData(response.data);
        setIsPolling(false);
        setLoading(false);
        setNextPollIn(null);
        if (onSuccess) onSuccess(response.data);
        return response.data;
      }
      
      if (response.status === 202) {
        const currentAttempt = isInitialCall ? 0 : attemptCount;
        
        if (currentAttempt >= maxAttempts) {
          const timeoutError = new Error(`Job polling timed out after ${maxAttempts} attempts`);
          setError(timeoutError.message);
          setIsPolling(false);
          setLoading(false);
          setNextPollIn(null);
          if (onError) onError(timeoutError);
          return;
        }

        setIsPolling(true);
        setLoading(false);
        setAttemptCount(currentAttempt + 1);
        
        const nextInterval = getNextInterval(currentAttempt);
        currentIntervalRef.current = nextInterval;
        
        if (onPending) {
          onPending({
            attempt: currentAttempt + 1,
            maxAttempts,
            nextPollIn: Math.ceil(nextInterval / 1000),
            message: response.data?.detail || 'Job is still processing...'
          });
        }

        const cleanupCountdown = startCountdown(nextInterval);
        
        timeoutRef.current = setTimeout(() => {
          cleanupCountdown();
          if (isActiveRef.current) {
            executeFetch(jobId, false);
          }
        }, nextInterval);
        
        return;
      }
      
      // Other status codes - treat as error
      throw new Error(`Unexpected status code: ${response.status}`);
      
    } catch (err) {
      setError(err.message);
      setIsPolling(false);
      setLoading(false);
      setNextPollIn(null);
      if (onError) onError(err);
      throw err;
    }
  }, [enabled, fetchFunction, maxAttempts, getNextInterval, onSuccess, onError, onPending, startCountdown, attemptCount, initialInterval]);

  // Start polling for a job
  const startPolling = useCallback((jobId) => {
    if (!jobId || !enabled) return;
    
    // Clear any existing polling
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    executeFetch(jobId, true);
  }, [enabled, executeFetch]);

  // Stop polling
  const stopPolling = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPolling(false);
    setLoading(false);
    setNextPollIn(null);
  }, []);

  // Reset all state
  const reset = useCallback(() => {
    stopPolling();
    setData(null);
    setError(null);
    setAttemptCount(0);
    currentIntervalRef.current = initialInterval;
  }, [stopPolling, initialInterval]);

  // Cleanup on unmount
  useEffect(() => {
    isActiveRef.current = true;
    return () => {
      isActiveRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    data,
    loading,
    error,
    isPolling,
    attemptCount,
    nextPollIn,
    
    // Actions
    startPolling,
    stopPolling,
    reset,
    
    // Status helpers
    isActive: isPolling || loading,
    hasTimedOut: attemptCount >= maxAttempts,
    currentInterval: currentIntervalRef.current
  };
};

/**
 * Specialized hook for PDDL plan polling
 */
export const usePlanPolling = (getPlanFunction, options = {}) => {
  return useJobPolling(getPlanFunction, {
    maxAttempts: 25, // PDDL planning can take longer
    maxInterval: 60000, // 1 minute max for planning
    ...options
  });
};

/**
 * Simplified hook for one-time job status checking with automatic polling
 */
export const useJobStatus = (fetchFunction, jobId, autoStart = true) => {
  const polling = useJobPolling(fetchFunction, {
    onSuccess: (data) => console.log('Job completed:', data),
    onError: (error) => console.error('Job failed:', error),
  });

  useEffect(() => {
    if (autoStart && jobId) {
      polling.startPolling(jobId);
    }
    
    return () => {
      polling.stopPolling();
    };
  }, [jobId, autoStart, polling]);

  return polling;
};