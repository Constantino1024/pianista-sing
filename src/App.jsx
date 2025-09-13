import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@pages/Home";
import PlannersPage from "@pages/PlannersPage";
import SolversPage from "@pages/SolversPage";
import GetPlanPage from "@pages/GetPlanPage";

export default function App() {
  return (
    <Router>
      <nav className="mb-6 space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/planners" className="text-blue-600 hover:underline">
          Planners
        </Link>
        <Link to="/solvers" className="text-blue-600 hover:underline">
          Solvers
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planners" element={<PlannersPage />} />
        <Route path="/solvers" element={<SolversPage />} />
        <Route path="/get-plan" element={<GetPlanPage />} />
      </Routes>
    </Router>
  );
}
