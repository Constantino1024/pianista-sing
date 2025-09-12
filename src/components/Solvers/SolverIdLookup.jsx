import ResourceLookup from "@components/common/ResourceLookup";
import { getSolverById } from "@api";

export default function SolverIdLookup() {
  return (
    <ResourceLookup
      title="Solver"
      fieldName="solverId"
      placeholder="Enter solver ID"
      fetchFunction={getSolverById}
      renderResult={(solver) => (
        <>
          <h3 className="font-bold text-green-700">Solver Found:</h3>
          <p>
            <span className="font-semibold">ID:</span> {solver.id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {solver.name}
          </p>
        </>
      )}
    />
  );
}
