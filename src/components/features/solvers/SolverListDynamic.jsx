import ResourceList from "@components/common/ResourceList";
import { getSolvers, getSolverById } from "@api";

const renderSolverItem = (solver, onSelect) => (
  <button
    key={solver.id}
    onClick={() => onSelect(solver.id)}
    className="w-full text-left p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900">{solver.name}</div>
  </button>
);

export default function DynamicSolversList({ onSolverSelect }) {
  const handleSelect = async (id) => {
    try {
      const { data } = await getSolverById(id);
      if (onSolverSelect) onSolverSelect(data.id, data);
    } catch (err) {
      console.error("Failed to fetch solver:", err.response?.data || err.message);
    }
  };

  return (
    <div className="space-y-6">
      <ResourceList
        title="Available Solvers"
        fetchFunction={getSolvers}
        renderItem={(solver) => renderSolverItem(solver, handleSelect)}
        emptyMessage="No solvers available"
      />
    </div>
  );
}