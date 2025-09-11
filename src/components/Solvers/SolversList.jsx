import ResourceList from "@components/common/ResourceList";
import { getSolvers } from "@api";

// Render function for individual solver items
const renderSolverItem = (solver) => (
  <div
    key={solver.id}
    className="p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900">{solver.name}</div>
    <div className="text-sm text-gray-500">ID: {solver.id}</div>
  </div>
);

export default function SolversList() {
  return (
    <ResourceList
      title="Available Solvers"
      fetchFunction={getSolvers}
      renderItem={renderSolverItem}
      emptyMessage="No solvers available"
    />
  );
}