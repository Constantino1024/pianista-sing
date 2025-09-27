import PropTypes from "prop-types";

export default function SolutionDisplay({ solution, className = "" }) {
  if (!solution) return null;

  const formatSolutionVariables = (solutionData) => {
    if (!solutionData || typeof solutionData !== 'object') {
      return null;
    }

    const entries = Object.entries(solutionData);
    if (entries.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 italic">No solution variables found</p>;
    }

    return (
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="font-mono font-semibold text-blue-700 dark:text-blue-300 min-w-0 break-words">
              {key}:
            </span>
            <span className="font-mono text-gray-900 dark:text-gray-100 flex-1 min-w-0">
              {formatValue(value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      if (value.length <= 5) {
        return `[${value.join(", ")}]`;
      }
      return `[${value.slice(0, 3).join(", ")}, ... and ${value.length - 3} more]`;
    }
    
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Solution Variables
      </h3>
      
      {formatSolutionVariables(solution)}
    </div>
  );
}

SolutionDisplay.propTypes = {
  solution: PropTypes.object,
  className: PropTypes.string,
};