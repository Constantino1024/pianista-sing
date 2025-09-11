import ResourceList from "@components/common/ResourceList";
import { getPlanners } from "@api";

// Render function for individual planner items
const renderPlannerItem = (planner) => (
  <div
    key={planner.id}
    className="p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900">{planner.name}</div>
    <div className="text-sm text-gray-500">ID: {planner.id}</div>
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