import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastProvider, SidebarProvider } from "@contexts";
import { Sidebar } from "./components/layout/Sidebar";
import { HamburgerButton, DarkModeToggle } from "@components/ui";
import { useSidebar } from "@hooks";

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
import VisionSpaceEyeBlack from "@assets/visionspace/VisionSpace_eye_Black.png";
import VisionSpaceEyeWhite from "@assets/visionspace/VisionSpace_eye_White.png";

function CollapsedSidebarButton() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement;
      setIsDark(html.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (isOpen) return null;

  return (
    <button
      onClick={toggleSidebar}
      className="fixed left-4 top-4 z-40 hidden md:flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border dark:border-gray-700"
      aria-label="Open sidebar"
      title="Open sidebar"
    >
      <img
        src={isDark ? VisionSpaceEyeWhite : VisionSpaceEyeBlack}
        alt="Open sidebar"
        className="w-6 h-6"
      />
    </button>
  );
}

function AppContent() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <CollapsedSidebarButton />
        
        <div className="flex flex-1 flex-col min-w-0">
          <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <HamburgerButton />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pianista
              </h1>
            </div>
            <DarkModeToggle />
          </div>
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planners" element={<Planners />} />
              <Route path="/plan" element={<Planners />} />
              <Route path="/solvers" element={<Solvers />} />
              <Route path="/solve" element={<Solvers />} />
              <Route path="/validators" element={<Validators />} />
              <Route path="/converters" element={<Converters />} />
              <Route path="/converters/mermaid-to-pddl" element={<MermaidToPddl />} />
              <Route path="/converters/pddl-to-mermaid" element={<PddlToMermaid />} />
              <Route path="/converters/natural-to-pddl" element={<NaturalToPddl />} />
              <Route path="/validators/validate-pddl" element={<ValidatePddlPage />} />
              <Route path="/validators/pddl-match" element={<PddlMatchValidatorPage />} />
              <Route path="/validators/pddl-plan" element={<PddlPlanValidatorPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </ToastProvider>
  );
}
