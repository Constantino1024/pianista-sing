import ResourceList from "@components/common/ResourceList";
import { getPlanners } from "@api";

const renderPlannerItem = (planner) => (
  <div
    key={planner.id}
    className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900 dark:text-gray-100">{planner.name}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">ID: {planner.id}</div>
  </div>
);

export default function PlannersList() {
  return (
    <ResourceList
      title="Available Planners"
      fetchFunction={getPlanners}
      renderItem={renderPlannerItem}
      emptyMessage="No planners available"
    />
  );
}