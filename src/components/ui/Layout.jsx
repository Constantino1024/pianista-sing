import PropTypes from 'prop-types';
import CopyButton from './CopyButton';
import { copyFormatters } from '../../utils/copyFormatters';

export function Card({ children, className = '', padding = 'p-6' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl ${padding} ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string
};

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
      <HeadingTag className={`text-gray-800 dark:text-gray-200 mb-2 ${sizeClasses[level]}`}>
        {title}
      </HeadingTag>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
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

export function FeatureList({ features, className = '' }) {
  return (
    <ul className={`text-sm text-gray-600 dark:text-gray-400 space-y-1 ${className}`}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 dark:text-green-400 mr-2 mt-0.5">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  );
}

export function InfoPanel({ 
  title, 
  children, 
  onClear, 
  clearText = "Clear Selection",
  className = ''
}) {
  return (
    <div className={`p-4 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
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

export function JobIdDisplay({ jobId, label = "Job ID" }) {
  if (!jobId) return null;
  
  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
      <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">Successfully Submitted</h3>
      <div className="flex justify-between items-center">
        <p className="text-gray-900 dark:text-gray-100">
          <span className="font-semibold">{label}:</span> {jobId}
        </p>
        <CopyButton 
          data={jobId}
          formatFn={copyFormatters.pddlText}
          size="xs"
          variant="ghost"
        />
      </div>
    </div>
  );
}

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