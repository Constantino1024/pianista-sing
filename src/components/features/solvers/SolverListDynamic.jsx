import ResourceList from "@components/common/ResourceList";
import { getSolvers, getSolverById } from "@api";
import { handleAsyncOperation } from "@utils/errorHandling";

const renderSolverItem = (solver, onSelect) => (
  <button
    key={solver.id}
    onClick={() => onSelect(solver.id)}
    className="w-full text-left p-3 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="font-medium text-gray-900 dark:text-gray-100">{solver.name}</div>
  </button>
);

export default function DynamicSolversList({ onSolverSelect }) {
  const handleSelect = async (id) => {
    const operation = async () => {
      const { data } = await getSolverById(id);
      return data;
    };

    const result = await handleAsyncOperation(operation, 'solver fetch');
    if (result && onSolverSelect) {
      onSolverSelect(result.id, result);
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