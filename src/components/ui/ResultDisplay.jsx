import PropTypes from 'prop-types';

const RESULT_VARIANTS = {
  success: {
    container: "bg-green-50 border-green-200",
    title: "text-green-700",
    icon: "✅"
  },
  error: {
    container: "bg-red-50 border-red-200", 
    title: "text-red-700",
    icon: "❌"
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200",
    title: "text-yellow-700", 
    icon: "⚠️"
  },
  info: {
    container: "bg-blue-50 border-blue-200",
    title: "text-blue-700",
    icon: "ℹ️"
  }
};

export default function ResultDisplay({ 
  variant = 'info',
  title,
  children,
  className = '',
  showIcon = true
}) {
  const variantStyles = RESULT_VARIANTS[variant] || RESULT_VARIANTS.info;

  return (
    <div className={`p-4 border rounded-lg ${variantStyles.container} ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {showIcon && (
          <span className="text-lg">{variantStyles.icon}</span>
        )}
        <h3 className={`font-bold text-lg ${variantStyles.title}`}>
          {title}
        </h3>
      </div>
      
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

export function ResultSection({ title, children, className = '' }) {
  return (
    <div className={`bg-white p-3 rounded border ${className}`}>
      {title && <h4 className="font-semibold mb-2">{title}</h4>}
      {children}
    </div>
  );
}

export function CodeBlock({ children, maxHeight = 'max-h-96' }) {
  return (
    <pre className={`whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border overflow-x-auto ${maxHeight} overflow-y-auto font-mono`}>
      {children}
    </pre>
  );
}

export function JsonDisplay({ data, maxHeight = 'max-h-96' }) {
  return (
    <CodeBlock maxHeight={maxHeight}>
      {JSON.stringify(data, null, 2)}
    </CodeBlock>
  );
}

ResultDisplay.propTypes = {
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showIcon: PropTypes.bool
};

ResultSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.string
};

JsonDisplay.propTypes = {
  data: PropTypes.any.isRequired,
  maxHeight: PropTypes.string
};