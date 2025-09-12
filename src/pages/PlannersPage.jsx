import PlannerIdLookup from "@components/Planners/PlannerIdLookup";
import PlannersList from "@components/Planners/PlannerList";
import PlannerListDynamic from "@components/Planners/PlannerListDynamic";

export default function PlannersPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Planners</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Lookup by ID</h2>
        <PlannerIdLookup />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">All Planners</h2>
        <PlannersList />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Interactive Planner List</h2>
        <PlannerListDynamic />
      </section>
    </div>
  );
}
