import PropTypes from 'prop-types';

const STATUS_VARIANTS = {
  success: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200 dark:border-green-700"
  },
  error: {
    bg: "bg-red-100 dark:bg-red-900", 
    text: "text-red-800 dark:text-red-200",
    border: "border-red-200 dark:border-red-700"
  },
  warning: {
    bg: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-800 dark:text-yellow-200", 
    border: "border-yellow-200 dark:border-yellow-700"
  },
  info: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-700"
  },
  neutral: {
    bg: "bg-gray-100 dark:bg-gray-700",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-gray-200 dark:border-gray-600"
  }
};

export default function StatusBadge({ 
  status, 
  variant = 'neutral', 
  size = 'sm',
  className = '',
  children 
}) {
  const statusVariant = STATUS_VARIANTS[variant] || STATUS_VARIANTS.neutral;
  
  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-3 py-1 text-sm", 
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <span
      className={`
        inline-block rounded-full font-medium
        ${statusVariant.bg} 
        ${statusVariant.text}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children || status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'neutral']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node
};