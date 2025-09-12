import ResourceList from "@components/common/ResourceList";
import { getPlanners, getPlannerById } from "@api";

const renderPlannerItem = (planner, onSelect) => (
  <button
    key={planner.id}
    onClick={() => onSelect(planner.id)}
    className="w-full text-left p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900">{planner.name}</div>
  </button>
);

export default function PlannersListDynamic({ onPlannerSelect }) {
  const handleSelect = async (id) => {
    try {
      const { data } = await getPlannerById(id);
      if (onPlannerSelect) onPlannerSelect(data.id, data);
    } catch (err) {
      console.error("Failed to fetch planner:", err.response?.data || err.message);
    }
  };

  return (
    <div className="space-y-6">
      <ResourceList
        title="Available Planners"
        fetchFunction={getPlanners}
        renderItem={(planner) => renderPlannerItem(planner, handleSelect)}
        emptyMessage="No planners available"
      />
    </div>
  );
}