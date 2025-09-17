import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from '@contexts';
import { ToastContainer } from '@components/ui';

export function ToastProvider({ children, position = 'top-right', maxToasts = 5 }) {
  const [toasts, setToasts] = useState([]);

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addToast = useCallback((toastOptions) => {
    const id = generateId();
    const newToast = {
      id,
      variant: 'info',
      duration: 5000,
      showProgress: true,
      ...toastOptions
    };

    setToasts(prevToasts => {
      const updatedToasts = [newToast, ...prevToasts];
      if (updatedToasts.length > maxToasts) {
        return updatedToasts.slice(0, maxToasts);
      }
      return updatedToasts;
    });

    return id;
  }, [generateId, maxToasts]);

  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback((message, options = {}) => {
    return addToast({ 
      ...options, 
      message, 
      variant: 'success',
      title: options.title || 'Success'
    });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ 
      ...options, 
      message, 
      variant: 'error',
      title: options.title || 'Error',
      duration: options.duration || 0
    });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ 
      ...options, 
      message, 
      variant: 'warning',
      title: options.title || 'Warning'
    });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ 
      ...options, 
      message, 
      variant: 'info',
      title: options.title || 'Info'
    });
  }, [addToast]);

  const value = {
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
    toasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onClose={removeToast} 
        position={position} 
      />
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top-left',
    'top-center', 
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ]),
  maxToasts: PropTypes.number
};