import SolverIdLookup from "@components/Solvers/SolverIdLookup";
import SolversList from "@components/Solvers/SolversList";
import SolverListDynamic from "@components/Solvers/SolverListDynamic";

export default function SolversPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Solvers</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Lookup by ID</h2>
        <SolverIdLookup />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">All Solvers</h2>
        <SolversList />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Interactive Solver List</h2>
        <SolverListDynamic />
      </section>
    </div>
  );
}
