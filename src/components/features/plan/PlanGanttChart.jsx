import { Chart } from "react-google-charts";
import { useState } from "react";
import { parsePddlPlan } from "@utils/planParser";
import { Card, SectionHeader, ResultSection } from "@components/ui";
import PropTypes from 'prop-types';

export default function PlanGanttChart({ plan, title = "Plan Timeline" }) {
  const [selectedAction, setSelectedAction] = useState(null);

  if (!plan) {
    return (
      <Card className="p-4">
        <SectionHeader title={title} description="No plan data provided" />
      </Card>
    );
  }

  let planText = '';
  if (typeof plan === 'string') {
    planText = plan;
  } else if (plan.plan && typeof plan.plan === 'string') {
    planText = plan.plan;
  } else if (plan.data && typeof plan.data === 'string') {
    planText = plan.data;
  } else {
    console.warn('Unknown plan structure:', plan);
    return (
      <Card className="p-4">
        <SectionHeader title={title} description="Invalid plan data structure" />
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800">
            Plan data structure not recognized. Expected string or object with 'plan' property.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-yellow-700">Show received data</summary>
            <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </details>
        </div>
      </Card>
    );
  }

  const parsedPlan = parsePddlPlan(planText);
  
  if (parsedPlan.actions.length === 0) {
    return (
      <Card className="p-4">
        <SectionHeader title={title} description="No actions found in plan" />
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800">
            Unable to parse plan actions. Plan format may not be supported.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-yellow-700">Show raw plan</summary>
            <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto max-h-32">
              {plan.plan}
            </pre>
          </details>
        </div>
      </Card>
    );
  }

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
    ],
  ];

  parsedPlan.actions.forEach((action) => {
    const startDate = new Date(action.start * 1000);
    const endDate = new Date(action.end * 1000);
    
    chartData.push([
      action.id,
      `${action.action}(${action.parameters.join(', ')})`,
      action.action,
      startDate,
      endDate,
      null,
      100,
      null,
    ]);
  });

  const options = {
    height: Math.max(400, parsedPlan.actions.length * 50 + 100),
    gantt: {
      trackHeight: 40,
      barHeight: 30,
      barCornerRadius: 4,
      arrow: {
        angle: 100,
        width: 1,
        color: "#666",
        radius: 0,
      },
      shadowEnabled: true,
      shadowColor: "#666",
      shadowOffset: 1,
      criticalPathEnabled: false,
      percentEnabled: false,
      labelStyle: {
        fontName: "Inter, sans-serif",
        fontSize: 12,
        color: "#333",
      },
    },
    backgroundColor: "transparent",
  };

  const chartEvents = [
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length > 0) {
          const selectedRow = selection[0].row;
          if (selectedRow !== null && selectedRow < parsedPlan.actions.length) {
            setSelectedAction(parsedPlan.actions[selectedRow]);
          }
        }
      },
    },
  ];

  return (
    <Card className="space-y-4">
      <SectionHeader 
        title={title}
        description={`${parsedPlan.actions.length} actions • ${parsedPlan.duration.toFixed(2)}s total duration`}
      />

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{parsedPlan.actions.length}</div>
            <div className="text-sm text-gray-600">Total Actions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{parsedPlan.duration.toFixed(2)}s</div>
            <div className="text-sm text-gray-600">Total Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{parsedPlan.metadata.actionTypes.length}</div>
            <div className="text-sm text-gray-600">Action Types</div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Chart
            chartType="Gantt"
            width="100%"
            height={`${options.height}px`}
            data={chartData}
            options={options}
            chartEvents={chartEvents}
          />
        </div>

        {selectedAction && (
          <ResultSection title="Action Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Action Information</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Action:</span> {selectedAction.action}</div>
                  <div><span className="font-medium">Parameters:</span> {selectedAction.parameters.join(', ') || 'None'}</div>
                  <div><span className="font-medium">Start Time:</span> {selectedAction.start.toFixed(3)}s</div>
                  <div><span className="font-medium">Duration:</span> {selectedAction.duration.toFixed(3)}s</div>
                  <div><span className="font-medium">End Time:</span> {selectedAction.end.toFixed(3)}s</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Original Line</h4>
                <code className="block text-xs bg-gray-100 p-2 rounded font-mono">
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
  plan: PropTypes.shape({
    plan: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};