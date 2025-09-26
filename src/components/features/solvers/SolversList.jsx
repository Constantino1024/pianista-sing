import ResourceList from "@components/common/ResourceList";
import { getSolvers } from "@api";

const renderSolverItem = (solver) => (
  <div
    key={solver.id}
    className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900 dark:text-gray-100">{solver.name}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">ID: {solver.id}</div>
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