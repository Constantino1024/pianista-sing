import PropTypes from 'prop-types';

const STATUS_VARIANTS = {
  success: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200"
  },
  error: {
    bg: "bg-red-100", 
    text: "text-red-800",
    border: "border-red-200"
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800", 
    border: "border-yellow-200"
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200"
  },
  neutral: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200"
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