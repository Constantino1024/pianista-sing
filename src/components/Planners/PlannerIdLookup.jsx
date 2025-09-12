import ResourceLookup from "@components/common/ResourceLookup";
import { getPlannerById } from "@api";

export default function PlannerIdLookup() {
  return (
    <ResourceLookup
      title="Planner"
      fieldName="plannerId"
      placeholder="Enter planner ID"
      fetchFunction={getPlannerById}
      renderResult={(planner) => (
        <>
          <h3 className="font-bold text-green-700">Planner Found:</h3>
          <p>
            <span className="font-semibold">ID:</span> {planner.id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {planner.name}
          </p>
        </>
      )}
    />
  );
}
