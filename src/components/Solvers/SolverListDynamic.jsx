import { useState } from "react";
import ResourceList from "@components/common/ResourceList";
import { getSolvers, getSolverById } from "@api";

export default function DynamicSolversList() {
  const [selectedSolver, setSelectedSolver] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (id) => {
    setSelectedSolver(null);
    setError(null);
    setLoading(true);

    try {
      const { data } = await getSolverById(id);
      setSelectedSolver(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch solver.");
    } finally {
      setLoading(false);
    }
  };

  const renderSolverItem = (solver) => (
    <button
      key={solver.id}
      onClick={() => handleSelect(solver.id)}
      className="w-full text-left p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="font-medium text-gray-900">{solver.name}</div>
      <div className="text-sm text-gray-500">ID: {solver.id}</div>
    </button>
  );

  return (
    <div className="space-y-4">
      <ResourceList
        title="Available Solvers"
        fetchFunction={getSolvers}
        renderItem={renderSolverItem}
        emptyMessage="No solvers available"
      />

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Solver Details</h3>
        {loading && <p className="text-blue-600">Loading solver details...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {selectedSolver && (
          <div className="space-y-1">
            <p><span className="font-semibold">ID:</span> {selectedSolver.id}</p>
            <p><span className="font-semibold">Name:</span> {selectedSolver.name}</p>
          </div>
        )}
        {!loading && !error && !selectedSolver && (
          <p className="text-gray-600">Select a solver to see details.</p>
        )}
      </div>
    </div>
  );
}
