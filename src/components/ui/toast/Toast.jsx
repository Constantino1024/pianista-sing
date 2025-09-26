import { useEffect } from 'react';
import PropTypes from 'prop-types';

const TOAST_VARIANTS = {
  success: {
    container: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300",
    icon: "✅",
    title: "text-green-700 dark:text-green-300",
    progressBar: "bg-green-500 dark:bg-green-400"
  },
  error: {
    container: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300",
    icon: "❌",
    title: "text-red-700 dark:text-red-300",
    progressBar: "bg-red-500 dark:bg-red-400"
  },
  warning: {
    container: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300",
    icon: "⚠️",
    title: "text-yellow-700 dark:text-yellow-300",
    progressBar: "bg-yellow-500 dark:bg-yellow-400"
  },
  info: {
    container: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300",
    icon: "ℹ️",
    title: "text-blue-700 dark:text-blue-300",
    progressBar: "bg-blue-500 dark:bg-blue-400"
  }
};

export default function Toast({
  id,
  variant = 'info',
  title,
  message,
  duration = 5000,
  showProgress = true,
  onClose,
  className = ''
}) {
  const variantStyles = TOAST_VARIANTS[variant];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`
        relative max-w-sm w-full border rounded-lg shadow-lg p-4 mb-3
        transform transition-all duration-300 ease-in-out
        ${variantStyles.container}
        ${className}
      `}
    >
      <button
        onClick={() => onClose(id)}
        className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none"
        aria-label="Close notification"
      >
        ×
      </button>

      <div className="flex items-start gap-3 pr-6">
        <span className="text-lg flex-shrink-0">{variantStyles.icon}</span>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold text-sm mb-1 ${variantStyles.title}`}>
              {title}
            </h4>
          )}
          <p className="text-sm break-words">{message}</p>
        </div>
      </div>

      {showProgress && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div
            className={`h-full ${variantStyles.progressBar} toast-progress`}
            style={{
              animation: `toastProgress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes toastProgress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .toast-progress {
          width: 100%;
          animation: toastProgress ${duration}ms linear forwards;
        }
      `}</style>
    </div>
  );
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  showProgress: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};