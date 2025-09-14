import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@pages/Home";
import Planners from "@pages/PlanPage";
import Solvers from "@pages/SolvePage";
import Validators from "@pages/ValidatorPage";

export default function App() {
  return (
    <Router>
      <nav className="mb-6 space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planners" element={<Planners />} />
        <Route path="/solvers" element={<Solvers />} />
        <Route path="/validators" element={<Validators />} />
      </Routes>
    </Router>
  );
}
