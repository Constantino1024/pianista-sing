import PropTypes from "prop-types";

export default function StatisticsDisplay({ statistics, className = "" }) {
  if (!statistics || typeof statistics !== 'object') {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        No statistics available
      </p>
    );
  }

  const formatStatistic = (key, value) => {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return 'N/A';
    }
    
    // Format time values
    if (key.toLowerCase().includes('time') || key.toLowerCase().includes('duration')) {
      if (typeof value === 'number') {
        return value < 1 ? `${(value * 1000).toFixed(2)}ms` : `${value.toFixed(3)}s`;
      }
    }
    
    // Format numeric values
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('count') || key.toLowerCase().includes('number')) {
        return value.toLocaleString();
      }
      // Format percentages
      if (key.toLowerCase().includes('percent') || key.toLowerCase().includes('ratio')) {
        return `${(value * 100).toFixed(2)}%`;
      }
      // Default number formatting
      return value.toLocaleString();
    }
    
    // Format boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    // Format arrays
    if (Array.isArray(value)) {
      if (value.length === 0) return 'Empty';
      if (value.length <= 3) return value.join(', ');
      return `${value.slice(0, 2).join(', ')} ... (+${value.length - 2} more)`;
    }
    
    // Format objects (minimize but keep some structure)
    if (typeof value === 'object' && value !== null) {
      const keys = Object.keys(value);
      if (keys.length <= 2) {
        return Object.entries(value)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
      }
      return `Object with ${keys.length} properties`;
    }
    
    return String(value);
  };

  const formatKey = (key) => {
    // Convert snake_case to Title Case
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const entries = Object.entries(statistics);
  
  if (entries.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        No statistics data found
      </p>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {entries.map(([key, value]) => (
        <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-0 break-words flex-shrink-0">
            {formatKey(key)}:
          </span>
          <span className="text-gray-900 dark:text-gray-100 flex-1 min-w-0 font-mono text-sm">
            {formatStatistic(key, value)}
          </span>
        </div>
      ))}
    </div>
  );
}

StatisticsDisplay.propTypes = {
  statistics: PropTypes.object,
  className: PropTypes.string,
};