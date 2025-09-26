import ResourceList from "@components/common/ResourceList";
import { getPlanners, getPlannerById } from "@api";
import { handleAsyncOperation } from "@utils/errorHandling";

const renderPlannerItem = (planner, onSelect) => (
  <button
    key={planner.id}
    onClick={() => onSelect(planner.id)}
    className="w-full text-left p-3 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900 dark:text-gray-100">{planner.name}</div>
  </button>
);

export default function PlannersListDynamic({ onPlannerSelect }) {
  const handleSelect = async (id) => {
    const operation = async () => {
      const { data } = await getPlannerById(id);
      return data;
    };

    const logError = (error) => {
      console.error("Failed to fetch planner:", error);
    };

    const result = await handleAsyncOperation(operation, 'planner fetch', logError);
    if (result && onPlannerSelect) {
      onPlannerSelect(result.id, result);
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