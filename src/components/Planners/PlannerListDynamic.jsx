import ResourceList from "@components/common/ResourceList";
import { getPlanners, getPlannerById } from "@api";
import { useState } from "react";

const renderPlannerItem = (planner, onSelect) => (
  <button
    key={planner.id}
    onClick={() => onSelect(planner.id)}
    className="w-full text-left p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900">{planner.name}</div>
    <div className="text-sm text-gray-500">ID: {planner.id}</div>
  </button>
);

export default function PlannersListDynamic() {
  const [selectedPlanner, setSelectedPlanner] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (id) => {
    setSelectedPlanner(null);
    setError(null);
    setLoading(true);

    try {
      const { data } = await getPlannerById(id);
      setSelectedPlanner(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch planner.");
    } finally {
      setLoading(false);
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

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Planner Details</h2>
        {loading && <p className="text-blue-600">Loading planner details...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {selectedPlanner && (
          <div className="space-y-1">
            <p>
              <span className="font-semibold">ID:</span> {selectedPlanner.id}
            </p>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedPlanner.name}
            </p>
          </div>
        )}
        {!loading && !error && !selectedPlanner && (
          <p className="text-gray-600">Select a planner to see details.</p>
        )}
      </div>
    </div>
  );
}
