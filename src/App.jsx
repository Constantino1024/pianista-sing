import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";

import Home from "@pages/Home";
import Planners from "@pages/PlanPage";
import Solvers from "@pages/SolvePage";
import Validators from "@pages/ValidatorPage";
import Converters from "@pages/ConverterPage";
import MermaidToPddl from "@pages/Converters/MermaidToPddlPage";
import PddlToMermaid from "@pages/Converters/PddlToMermaidPage";
import NaturalToPddl from "@pages/Converters/NaturalToPddlPage";
import ValidatePddlPage from "@pages/Validators/ValidatePddlPage";
import PddlMatchValidatorPage from "@pages/Validators/PddlMatchValidatorPage";
import PddlPlanValidatorPage from "@pages/Validators/PddlPlanValidatorPage";


export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planners" element={<Planners />} />
            <Route path="/solvers" element={<Solvers />} />
            <Route path="/validators" element={<Validators />} />
            <Route path="/converters" element={<Converters />} />
            <Route path="/converters/mermaid-to-pddl" element={<MermaidToPddl />} />
            <Route path="/converters/pddl-to-mermaid" element={<PddlToMermaid />} />
            <Route path="/converters/natural-to-pddl" element={<NaturalToPddl />} />
            <Route path="/validators/pddl" element={<ValidatePddlPage />} />
            <Route path="/validators/match" element={<PddlMatchValidatorPage />} />
            <Route path="/validators/plan" element={<PddlPlanValidatorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
