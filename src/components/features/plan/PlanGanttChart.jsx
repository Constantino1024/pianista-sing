import { Chart } from "react-google-charts";
import { useState, useMemo, useCallback } from "react";
import { parsePddlPlan } from "@utils/planParser";
import { Card, SectionHeader, ResultSection } from "@components/ui";
import { useGanttZoom } from "@hooks/useGanttZoom";
import PlanFilters from "./PlanFilters";
import PropTypes from 'prop-types';

export default function PlanGanttChart({ plan, title = "Plan Timeline" }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [filters, setFilters] = useState({ actionType: '', timeRange: { start: '', end: '' } });
  const { zoom, zoomIn, zoomOut, resetZoom } = useGanttZoom(1);

  // Early parsing for hook dependencies
  let planText = '';
  if (typeof plan === 'string') {
    planText = plan;
  } else if (plan?.plan && typeof plan.plan === 'string') {
    planText = plan.plan;
  } else if (plan?.data && typeof plan.data === 'string') {
    planText = plan.data;
  }
  
  const parsedPlan = planText ? parsePddlPlan(planText) : { actions: [], dependencies: {} };

  // Filter actions based on current filters (must be at top level)
  const filteredActions = useMemo(() => {
    return parsedPlan.actions.filter(action => {
      // Action type filter
      if (filters.actionType) {
        const actionName = action.action || action.name || '';
        const actionType = actionName.toLowerCase().trim();
        if (actionType !== filters.actionType) return false;
      }

      // Time range filters
      if (filters.timeRange.start && action.start < parseFloat(filters.timeRange.start)) return false;
      if (filters.timeRange.end && action.end > parseFloat(filters.timeRange.end)) return false;

      return true;
    });
  }, [parsedPlan.actions, filters]);

  // Generate colors for different action types using useCallback to prevent re-renders
  const generateActionColor = useCallback((taskName, index) => {
    // Create more distinct colors for different tasks
    const predefinedColors = [
      '#E53E3E', // Red for t1
      '#3182CE', // Blue for t2  
      '#38A169', // Green for t3
      '#D69E2E', // Orange for t4
      '#805AD5', // Purple for t5
      '#DD6B20', // Orange for t6
      '#319795', // Teal for t7
      '#E53E3E'  // Cycle back
    ];
    
    // If we have predefined colors, use them
    if (index < predefinedColors.length) {
      return predefinedColors[index];
    }
    
    // Fallback to HSL generation for more tasks
    const hue = (index * 137.508) % 360; // Golden angle distribution
    const saturation = 65 + (index % 3) * 10;
    const lightness = 45 + (index % 4) * 8;
    
    // Convert HSL to Hex for Google Charts compatibility
    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    
    return hslToHex(hue, saturation, lightness);
  }, []);

  // Generate action type to color mapping
  const actionTypeColors = useMemo(() => {
    // Get unique task names or action types for coloring
    const taskNames = [...new Set(parsedPlan.actions.map(action => {
      // Prefer taskName, fall back to action name, then first parameter
      return action.taskName || action.action || (action.parameters && action.parameters[0]) || 'unknown';
    }))];
    
    return taskNames.reduce((acc, taskName, index) => {
      acc[taskName] = generateActionColor(taskName, index);
      return acc;
    }, {});
  }, [parsedPlan.actions, generateActionColor]);

  if (!plan) {
    return (
      <Card className="p-4">
        <SectionHeader title={title} description="No plan data provided" />
      </Card>
    );
  }

  if (!parsedPlan.actions || parsedPlan.actions.length === 0) {
    return (
      <Card className="p-4">
        <SectionHeader title={title} description="Invalid plan data structure" />
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded">
          <p className="text-yellow-800 dark:text-yellow-300">
            Plan data structure not recognized. Expected string or object with 'plan' property.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-yellow-700 dark:text-yellow-300">Show received data</summary>
            <pre className="mt-2 text-xs bg-yellow-100 dark:bg-yellow-800/30 text-yellow-900 dark:text-yellow-200 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </details>
        </div>
      </Card>
    );
  }

  if (filteredActions.length === 0 && parsedPlan.actions.length > 0) {
    return (
      <Card className="p-4 space-y-4">
        <SectionHeader title={title} description="No actions match the current filters" />
        <PlanFilters 
          actions={parsedPlan.actions} 
          onFilterChange={setFilters}
        />
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
          <p className="text-blue-800 dark:text-blue-300">
            Adjust your filters to see plan actions. Total available actions: {parsedPlan.actions.length}
          </p>
        </div>
      </Card>
    );
  }
  
  if (parsedPlan.actions.length === 0) {
    return (
      <Card className="p-4">
        <SectionHeader title={title} description="No actions found in plan" />
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded">
          <p className="text-yellow-800 dark:text-yellow-300">
            Unable to parse plan actions. Plan format may not be supported.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-yellow-700 dark:text-yellow-300">Show raw plan</summary>
            <pre className="mt-2 text-xs bg-yellow-100 dark:bg-yellow-800/30 text-yellow-900 dark:text-yellow-200 p-2 rounded overflow-auto max-h-32">
              {plan.plan}
            </pre>
          </details>
        </div>
      </Card>
    );
  }

  // Prepare Gantt chart data according to react-google-charts documentation
  const chartData = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
      { type: "string", role: "style" }, // Add style column for colors
    ]
  ];

  const extractTaskNameFromAction = (action) => {
    // More flexible task name extraction
    if (action.taskName) {
      return action.taskName;
    }
    if (action.parameters && action.parameters.length > 0) {
      return action.parameters[0]; // Use first parameter
    }
    return action.action || 'unknown'; // Fall back to action name
  };

  // Create a mapping from task names to task IDs for dependency resolution
  const taskNameToId = {};
  filteredActions.forEach((action, index) => {
    const taskName = extractTaskNameFromAction(action);
    const taskId = action.id || `action-${index}`;
    if (taskName) {
      taskNameToId[taskName] = taskId;
    }
  });

  filteredActions.forEach((action, index) => {
    // Ensure we have the required fields
    const taskId = action.id || `action-${index}`;
    const actionName = action.action || action.name || 'unknown';
    const taskForColor = extractTaskNameFromAction(action);
    const resource = taskForColor || actionName.toLowerCase().trim(); // Use task name for color grouping
    
    // Get color for this specific task (different color per task)
    const actionColor = actionTypeColors[resource] || actionTypeColors[taskForColor] || '#4285F4';
    
    // Convert start/end times to dates (assuming times are in seconds)
    const startTime = action.start || index;
    const endTime = action.end || startTime + (action.duration || 1);
    
    // Create dates - using epoch + seconds for simple conversion
    const startDate = new Date(startTime * 1000);
    const endDate = new Date(endTime * 1000);
    
    // Format parameters for display
    const parameters = action.parameters || [];
    const displayName = parameters.length > 0 
      ? `${actionName}(${parameters.join(', ')})` 
      : actionName;

    // Find dependencies for this action and map to task IDs
    const currentTaskName = extractTaskNameFromAction(action);
    let actionDependencies = null;
    
    if (parsedPlan.dependencies && parsedPlan.dependencies[currentTaskName]) {
      const depTaskIds = parsedPlan.dependencies[currentTaskName]
        .map(depTaskName => taskNameToId[depTaskName])
        .filter(id => id);
      
      if (depTaskIds.length > 0) {
        actionDependencies = depTaskIds.join(',');
      }
    }

    chartData.push([
      taskId,           // Task ID
      displayName,      // Task Name  
      resource,         // Resource
      startDate,        // Start Date
      endDate,          // End Date
      null,             // Duration (auto-calculated)
      100,              // Percent Complete
      actionDependencies, // Dependencies
      actionColor,      // Style/Color (hex format)
    ]);
  });

  const options = {
    height: Math.max(400, filteredActions.length * 40 + 100) * zoom,
    width: Math.max(1200, filteredActions.length * 150) * zoom, // Wider for better scrolling
    gantt: {
      trackHeight: Math.max(20, 30 * zoom),
      barHeight: Math.max(15, 20 * zoom),
      barCornerRadius: 2,
      arrow: {
        angle: 100,
        width: 2, // Slightly thicker arrows for better visibility
        color: '#333', // Darker arrows
        radius: 8 // More curved arrows
      },
      shadowEnabled: true,
      shadowColor: '#000',
      shadowOffset: 1,
      criticalPathEnabled: true, // Enable critical path visualization
      criticalPathStyle: {
        stroke: '#e64a19',
        strokeWidth: 3 // Thicker critical path
      },
      innerGridHorizLine: {
        stroke: '#e0e0e0',
        strokeWidth: 1
      },
      innerGridTrack: {
        fill: '#f5f5f5'
      },
      innerGridDarkTrack: {
        fill: '#eeeeee'  
      },
      labelStyle: {
        fontName: 'Arial',
        fontSize: Math.max(10, 12 * Math.min(zoom, 1.2)),
        color: '#424242'
      },
      percentEnabled: false,
      sortTasks: false, // Keep original order to maintain dependency flow
      // Color mapping based on resource (action type)
      palette: Object.values(actionTypeColors)
    },
    backgroundColor: 'transparent',
    // Enable scrollbars and zoom for the chart itself
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
      axis: 'horizontal',
      keepInBounds: false, // Allow free panning
      maxZoomIn: 8.0,
      maxZoomOut: 0.1
    },
    // Chart area with padding to prevent edge cut-off
    chartArea: {
      left: 200, // More space for task labels
      top: 60,   // Top padding
      width: '75%', // Leave space on right
      height: '80%' // Leave space on bottom
    }
  };

  const chartEvents = [
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length > 0) {
          const selectedRow = selection[0].row;
          if (selectedRow !== null && selectedRow < filteredActions.length) {
            setSelectedAction(filteredActions[selectedRow]);
          }
        }
      },
    },
  ];

  return (
    <Card className="space-y-4">
      <SectionHeader 
        title={title}
        description={`${parsedPlan.actions.length} actions total • ${filteredActions.length} shown • ${parsedPlan.dependencies ? Object.keys(parsedPlan.dependencies).length : 0} dependencies • ${parsedPlan.duration.toFixed(2)}s duration`}
      />

      {/* Filters and Zoom Controls */}
      <div className="space-y-4">
        <PlanFilters 
          actions={parsedPlan.actions} 
          onFilterChange={setFilters}
        />
        
        {/* Zoom and Color Controls */}
        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Zoom: {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out (Min: 50%)"
            >
              −
            </button>
            <button
              onClick={resetZoom}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              title="Reset Zoom to 100%"
            >
              Reset
            </button>
            <button
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In (Max: 300%)"
            >
              +
            </button>
          </div>
          
          {/* Color Legend */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resources:</span>
            {Object.entries(actionTypeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{type}</span>
              </div>
            ))}
          </div>
          
          {/* Usage Instructions */}
          <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
            💡 Tips: Drag to pan • Right-click to reset • Click bars for details
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredActions.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Shown Actions</div>
            {filteredActions.length !== parsedPlan.actions.length && (
              <div className="text-xs text-gray-500 dark:text-gray-500">({parsedPlan.actions.length} total)</div>
            )}
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{parsedPlan.duration.toFixed(2)}s</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{parsedPlan.metadata.actionTypes.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Action Types</div>
          </div>
        </div>

        <div 
          className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800" 
          style={{ 
            maxHeight: '80vh', // Responsive height
            height: `${Math.max(500, filteredActions.length * 50 + 150)}px`,
            padding: '24px', // Internal padding to prevent edge cut-off
            overflowX: 'auto',
            overflowY: 'auto'
          }}
        >
          {filteredActions.length > 0 ? (
            <Chart
              chartType="Gantt"
              width={`${Math.max(1200, filteredActions.length * 150) * zoom}px`}
              height={`${Math.max(400, filteredActions.length * 40 + 100) * zoom}px`}
              data={chartData}
              options={options}
              chartEvents={chartEvents}
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              No actions to display after filtering
            </div>
          )}
        </div>

        {selectedAction && (
          <ResultSection title="Action Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Action Information</h4>
                <div className="space-y-1 text-sm text-gray-900 dark:text-gray-100">
                  <div><span className="font-medium">Action:</span> {selectedAction.action || selectedAction.name || 'Unknown'}</div>
                  <div><span className="font-medium">Parameters:</span> {(selectedAction.parameters || []).join(', ') || 'None'}</div>
                  <div><span className="font-medium">Start Time:</span> {(selectedAction.start || 0).toFixed(3)}s</div>
                  <div><span className="font-medium">Duration:</span> {(selectedAction.duration || (selectedAction.end - selectedAction.start) || 0).toFixed(3)}s</div>
                  <div><span className="font-medium">End Time:</span> {(selectedAction.end || selectedAction.start || 0).toFixed(3)}s</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Original Line</h4>
                <code className="block text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded font-mono">
                  {selectedAction.originalLine}
                </code>
              </div>
            </div>
          </ResultSection>
        )}

        <ResultSection title="Action Types">
          <div className="flex flex-wrap gap-2">
            {parsedPlan.metadata.actionTypes.map((actionType, index) => (
              <span
                key={actionType}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `hsl(${(index * 137.5) % 360}, 50%, 85%)`,
                  color: `hsl(${(index * 137.5) % 360}, 50%, 25%)`,
                }}
              >
                {actionType}
              </span>
            ))}
          </div>
        </ResultSection>
      </div>
    </Card>
  );
}

PlanGanttChart.propTypes = {
  plan: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      plan: PropTypes.string,
      data: PropTypes.string,
    })
  ]),
  title: PropTypes.string,
};