import { useState } from 'react';
import PropTypes from 'prop-types';

export default function PlanFilters({ 
  actions = [], 
  onFilterChange, 
  className = ""
}) {
  const [actionTypeFilter, setActionTypeFilter] = useState('');
  const [timeRangeFilter, setTimeRangeFilter] = useState({ start: '', end: '' });

  // Extract unique action types - handle different action structures
  const actionTypes = [...new Set(
    actions
      .filter(action => action && (action.action || action.name))
      .map(action => {
        const actionName = action.action || action.name || '';
        return actionName.toLowerCase().trim();
      })
      .filter(type => type.length > 0)
  )];
  
  const handleActionTypeChange = (type) => {
    setActionTypeFilter(type);
    onFilterChange?.({ actionType: type, timeRange: timeRangeFilter });
  };

  const handleTimeRangeChange = (field, value) => {
    const newTimeRange = { ...timeRangeFilter, [field]: value };
    setTimeRangeFilter(newTimeRange);
    onFilterChange?.({ actionType: actionTypeFilter, timeRange: newTimeRange });
  };

  const clearFilters = () => {
    setActionTypeFilter('');
    setTimeRangeFilter({ start: '', end: '' });
    onFilterChange?.({ actionType: '', timeRange: { start: '', end: '' } });
  };

  return (
    <div className={`space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Plan Filters
      </h3>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Action Type
          </label>
          <select
            value={actionTypeFilter}
            onChange={(e) => handleActionTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Action Types</option>
            {actionTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Filters */}
        <div className="flex-1 min-w-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Time
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={timeRangeFilter.start}
            onChange={(e) => handleTimeRangeChange('start', e.target.value)}
            placeholder="Min"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-1 min-w-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Time
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={timeRangeFilter.end}
            onChange={(e) => handleTimeRangeChange('end', e.target.value)}
            placeholder="Max"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(actionTypeFilter || timeRangeFilter.start || timeRangeFilter.end) && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {actionTypeFilter && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">
              Type: {actionTypeFilter}
            </span>
          )}
          {timeRangeFilter.start && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full">
              Start: {timeRangeFilter.start}
            </span>
          )}
          {timeRangeFilter.end && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full">
              End: {timeRangeFilter.end}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

PlanFilters.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.number,
    duration: PropTypes.number
  })),
  onFilterChange: PropTypes.func,
  className: PropTypes.string
};