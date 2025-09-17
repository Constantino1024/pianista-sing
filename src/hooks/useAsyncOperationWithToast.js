import { useAsyncOperation } from './useAsyncOperation';
import { useToast } from './useToast';

export function useAsyncOperationWithToast(options = {}) {
  const { 
    successMessage = 'Operation completed successfully!',
    errorTitle = 'Error',
    showSuccess = true,
    showError = true,
    ...asyncOptions 
  } = options;
  
  const toast = useToast();
  const asyncOp = useAsyncOperation(asyncOptions);

  const executeWithToast = async (operation, context = '') => {
    try {
      const result = await asyncOp.execute(operation, context);
      
      if (showSuccess) {
        const message = typeof successMessage === 'function' 
          ? successMessage(result, context) 
          : (context ? `${context} completed successfully!` : successMessage);
        toast.success(message);
      }
      
      return result;
    } catch (error) {
      if (showError && !asyncOp.error) {
        const errorMessage = error.response?.data?.detail || 
                           error.response?.data?.message ||
                           error.message || 
                           `An error occurred${context ? ` during ${context}` : ''}`;
        toast.error(errorMessage, { title: errorTitle });
      }
      throw error;
    }
  };

  return {
    ...asyncOp,
    executeWithToast,
    execute: executeWithToast
  };
}

export function useAsyncFormWithToast(submitHandler, options = {}) {
  const { 
    successMessage = 'Form submitted successfully!',
    errorTitle = 'Submission Error',
    ...restOptions 
  } = options;
  
  const asyncOp = useAsyncOperationWithToast({ 
    successMessage, 
    errorTitle, 
    ...restOptions 
  });

  const handleSubmit = async (data) => {
    try {
      const result = await asyncOp.execute(() => submitHandler(data), 'form submission');
      return result;
    } catch {
      return null;
    }
  };

  return {
    ...asyncOp,
    handleSubmit
  };
}