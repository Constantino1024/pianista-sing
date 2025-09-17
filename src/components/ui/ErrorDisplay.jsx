import PropTypes from 'prop-types';

const ERROR_VARIANTS = {
  error: {
    container: "bg-red-50 border-red-200",
    title: "text-red-700",
    text: "text-red-700",
    icon: "❌"
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200", 
    title: "text-yellow-700",
    text: "text-yellow-700",
    icon: "⚠️"
  },
  info: {
    container: "bg-blue-50 border-blue-200",
    title: "text-blue-700", 
    text: "text-blue-700",
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
            className="ml-4 px-3 py-1 bg-white border border-current rounded text-sm hover:bg-gray-50 transition-colors"
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
    <p className={`text-sm text-red-600 ${className}`}>
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