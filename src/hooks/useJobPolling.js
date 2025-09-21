import { useState, useCallback, useRef, useEffect } from 'react';
import { config } from '@config/environment';
import { useToast } from '@hooks';

export const useJobPolling = (fetchFunction, options = {}) => {
  const {
    initialInterval = config.features.ui.autoRefreshInterval,
    maxInterval = 30000,
    maxAttempts = 5,
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
  const attemptCountRef = useRef(0);
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
    if (!enabled || !jobId || !isActiveRef.current) return;

    if (isInitialCall) {
      setLoading(true);
      setError(null);
      setData(null);
      attemptCountRef.current = 0;
      setAttemptCount(0);
      currentIntervalRef.current = initialInterval;
    }

    try {
      const response = await fetchFunction(jobId);
      
      if (response.status === 200 || response.status === 201) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        setData(response.data);
        setIsPolling(false);
        setLoading(false);
        setNextPollIn(null);
        if (onSuccess) onSuccess(response.data);
        return response.data;
      }
      
      if (response.status === 202) {
        const currentAttempt = attemptCountRef.current;
        
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
        attemptCountRef.current = currentAttempt + 1;
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
      
      throw new Error(`Unexpected status code: ${response.status}`);
      
    } catch (error) {
      console.error('Job polling error:', error);
      
      if (error.response?.status === 500) {
        const currentAttempt = attemptCountRef.current;
        
        if (currentAttempt < Math.min(5, maxAttempts)) {
          console.log(`Server error (500), retrying... (attempt ${currentAttempt + 1})`);
          
          setIsPolling(true);
          setLoading(false);
          attemptCountRef.current = currentAttempt + 1;
          setAttemptCount(currentAttempt + 1);
          
          const nextInterval = getNextInterval(currentAttempt);
          currentIntervalRef.current = nextInterval;
          
          if (onPending) {
            onPending({
              attempt: currentAttempt + 1,
              maxAttempts,
              nextPollIn: Math.ceil(nextInterval / 1000),
              message: 'Server error, retrying...'
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
        } else {
          const serverError = new Error(`Server error (500): The job may have failed or the server is having issues. Job ID: ${jobId}`);
          setError(serverError.message);
          setIsPolling(false);
          setLoading(false);
          setNextPollIn(null);
          if (onError) onError(serverError);
          return;
        }
      }
      
      if (error.response?.status === 404) {
        if (data && data.plan) {
          console.log('Job completed and cleaned up (404 is expected)');
          setIsPolling(false);
          setLoading(false);
          setNextPollIn(null);
          return;
        }
        
        const notFoundError = new Error(`Job not found. The job ID "${jobId}" may be invalid or expired.`);
        setError(notFoundError.message);
        setIsPolling(false);
        setLoading(false);
        setNextPollIn(null);
        if (onError) onError(notFoundError);
        return;
      }
      
      setError(error.message);
      setIsPolling(false);
      setLoading(false);
      setNextPollIn(null);
      if (onError) onError(error);
    }
  }, [enabled, fetchFunction, maxAttempts, getNextInterval, onSuccess, onError, onPending, startCountdown, initialInterval, data]);

  const startPolling = useCallback((jobId) => {
    if (!jobId || !enabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    executeFetch(jobId, true);
  }, [enabled, executeFetch]);

  const stopPolling = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPolling(false);
    setLoading(false);
    setNextPollIn(null);
  }, []);

  const reset = useCallback(() => {
    stopPolling();
    setData(null);
    setError(null);
    attemptCountRef.current = 0;
    setAttemptCount(0);
    currentIntervalRef.current = initialInterval;
  }, [stopPolling, initialInterval]);

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
    data,
    loading,
    error,
    isPolling,
    attemptCount,
    nextPollIn,
    startPolling,
    stopPolling,
    reset,
    isActive: isPolling || loading,
    hasTimedOut: attemptCount >= maxAttempts,
    currentInterval: currentIntervalRef.current
  };
};

export const usePlanPolling = (getPlanFunction, options = {}) => {
  return useJobPolling(getPlanFunction, {
    maxAttempts: 25,
    maxInterval: 60000,
    ...options
  });
};

export const useJobStatus = (fetchFunction, jobId, autoStart = true, options = {}) => {
  const { showToast = false } = options;
  const toast = useToast();
  
  const polling = useJobPolling(fetchFunction, {
    onSuccess: (data) => {
      console.log('Job completed:', data);
      if (showToast) {
        toast.success('Job completed successfully!');
      }
    },
    onError: (error) => {
      console.error('Job failed:', error);
      if (showToast) {
        toast.error(`Job failed: ${error.message}`);
      }
    },
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