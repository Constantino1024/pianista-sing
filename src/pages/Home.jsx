import ApiStatus from "@components/ApiStatus";
import Planners from "@components/Planners/PlannerList";
import SolversList from "@components/Solvers/SolversList";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-4">
      <ApiStatus />
      <div>
        <Planners />
      </div>
      <div>
        <SolversList />
      </div>
    </div>
  );
}
