import PropTypes from 'prop-types';

const ERROR_VARIANTS = {
  error: {
    container: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700",
    title: "text-red-700 dark:text-red-300",
    text: "text-red-700 dark:text-red-300",
    icon: "❌"
  },
  warning: {
    container: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700", 
    title: "text-yellow-700 dark:text-yellow-300",
    text: "text-yellow-700 dark:text-yellow-300",
    icon: "⚠️"
  },
  info: {
    container: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
    title: "text-blue-700 dark:text-blue-300", 
    text: "text-blue-700 dark:text-blue-300",
    icon: "ℹ️"
  }
};

export default function ErrorDisplay({ 
  error, 
  title = "Error",
  variant = 'error',
  className = '',
  showIcon = true,
  onRetry,
  retryText = "Try Again"
}) {
  const variantStyles = ERROR_VARIANTS[variant] || ERROR_VARIANTS.error;

  if (!error) return null;

  return (
    <div className={`p-4 border rounded-lg ${variantStyles.container} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {showIcon && (
              <span className="text-lg">{variantStyles.icon}</span>
            )}
            <h3 className={`font-bold ${variantStyles.title}`}>
              {title}
            </h3>
          </div>
          
          <div className={variantStyles.text}>
            {typeof error === 'string' ? (
              <p>{error}</p>
            ) : error.message ? (
              <p>{error.message}</p>
            ) : (
              <p>An unexpected error occurred</p>
            )}
          </div>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-4 px-3 py-1 bg-white dark:bg-gray-800 border border-current rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
}

export function ErrorText({ error, className = '' }) {
  if (!error) return null;
  
  return (
    <p className={`text-sm text-red-600 dark:text-red-400 ${className}`}>
      {typeof error === 'string' ? error : error.message || 'An error occurred'}
    </p>
  );
}

ErrorDisplay.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
      details: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    })
  ]).isRequired,
  variant: PropTypes.oneOf(['error', 'warning']),
  className: PropTypes.string,
  showDetails: PropTypes.bool
};

ErrorText.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string
    })
  ]),
  className: PropTypes.string
};