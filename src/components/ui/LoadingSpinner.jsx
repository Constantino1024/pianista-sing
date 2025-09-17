import PropTypes from 'prop-types';

const LOADING_VARIANTS = {
  spinner: "Loading...",
  dots: "Loading",
  pulse: "Loading..."
};

export default function LoadingSpinner({ 
  variant = 'spinner',
  size = 'md',
  message,
  className = ''
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg", 
    xl: "text-xl"
  };

  if (variant === 'pulse') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className={`${sizeClasses[size]} bg-blue-500 rounded-full animate-pulse`}></div>
        <span className={`text-blue-600 ${textSizeClasses[size]}`}>
          {message || LOADING_VARIANTS[variant]}
        </span>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        <span className={`text-blue-600 ${textSizeClasses[size]}`}>
          {message || 'Loading'}
        </span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
      <span className={`text-blue-600 ${textSizeClasses[size]}`}>
        {message || LOADING_VARIANTS[variant]}
      </span>
    </div>
  );
}

export function ButtonLoading({ children, isLoading, loadingText = "Loading..." }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>{loadingText}</span>
      </div>
    );
  }
  
  return children;
}

LoadingSpinner.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  message: PropTypes.string,
  className: PropTypes.string
};

ButtonLoading.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string
};