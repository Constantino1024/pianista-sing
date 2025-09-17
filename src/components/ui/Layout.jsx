import PropTypes from 'prop-types';

// Card component for consistent container styling
export function Card({ children, className = '', padding = 'p-6' }) {
  return (
    <div className={`bg-white shadow-lg rounded-2xl ${padding} ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string
};

// Section header with optional description
export function SectionHeader({ 
  title, 
  description, 
  level = 2,
  className = '' 
}) {
  const HeadingTag = `h${level}`;
  
  const sizeClasses = {
    1: "text-3xl font-bold",
    2: "text-xl font-semibold", 
    3: "text-lg font-semibold",
    4: "text-base font-semibold",
    5: "text-sm font-semibold",
    6: "text-xs font-semibold"
  };

  return (
    <div className={className}>
      <HeadingTag className={`text-gray-800 mb-2 ${sizeClasses[level]}`}>
        {title}
      </HeadingTag>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string
};

// Feature list component
export function FeatureList({ features, className = '' }) {
  return (
    <ul className={`text-sm text-gray-600 space-y-1 ${className}`}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2 mt-0.5">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  );
}

// Info panel for showing selected items
export function InfoPanel({ 
  title, 
  children, 
  onClear, 
  clearText = "Clear Selection",
  className = ''
}) {
  return (
    <div className={`p-4 border rounded bg-gray-50 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            {clearText}
          </button>
        )}
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

// Job ID display component
export function JobIdDisplay({ jobId, label = "Job ID" }) {
  if (!jobId) return null;
  
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-bold text-green-700 mb-2">Successfully Submitted</h3>
      <p>
        <span className="font-semibold">{label}:</span> {jobId}
      </p>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string
};

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string
};

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClear: PropTypes.func,
  clearText: PropTypes.string,
  className: PropTypes.string
};

JobIdDisplay.propTypes = {
  jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string
};