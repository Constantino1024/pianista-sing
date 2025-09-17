import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SolversList from "@components/common/ResourceList";
import SolversListDynamic from "@components/features/solvers/SolverListDynamic";
import GetSolve from "@components/features/solves/GetSolve";
import SolveForm from "@components/features/solves/SolveForm";
import { getSolverById } from "@api";

export default function Solvers() {
  const [selectedSolverId, setSelectedSolverId] = useState("or-tools");
  const [selectedSolverDetails, setSelectedSolverDetails] = useState(null);

  useEffect(() => {
    const fetchDefaultSolver = async () => {
      const { data } = await getSolverById("or-tools");
      setSelectedSolverDetails(data);
    };
    fetchDefaultSolver();
  }, []);

  const handleSolverSelect = (solverId, solverDetails) => {
    setSelectedSolverId(solverId);
    setSelectedSolverDetails(solverDetails);
  };

  const clearSolverSelection = async () => {
    setSelectedSolverId("or-tools");
    const { data } = await getSolverById("or-tools");
    setSelectedSolverDetails(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MiniZinc Solvers</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SolversListDynamic onSolverSelect={handleSolverSelect} />
          </div>
          <div className="lg:col-span-2">
            <SolveForm
              selectedSolverId={selectedSolverId}
              selectedSolverDetails={selectedSolverDetails}
              clearSolver={clearSolverSelection}
            />
          </div>
          <div className="lg:col-span-3">
            <GetSolve />
          </div>
        </div>
      </div>
    </div>
  );
}
