import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { DarkModeToggle } from "@components/ui";
import VisionSpaceEyeBlack from "@assets/visionspace/VisionSpace_eye_Black.png";
import VisionSpaceEyeWhite from "@assets/visionspace/VisionSpace White SVG.svg";
import VisionSpaceWordmark2LineBlack from "@assets/visionspace/VisionSpace_Wordmark_2lines_Black.png";
import VisionSpaceWordmark2LineWhite from "@assets/visionspace/VisionSpace_Wordmark_2lines_White.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "PDDL Planning", path: "/planners" },
  { label: "MiniZinc Solving", path: "/solvers" },
  {
    label: "Validators",
    children: [
      { label: "Validate PDDL", path: "/validators/pddl" },
      { label: "Validate Domain & Problem Match", path: "/validators/match" },
      { label: "Validate Problem Plan", path: "/validators/plan" },
    ],
  },
  {
    label: "Converters",
    children: [
      { label: "Mermaid → PDDL", path: "/converters/mermaid-to-pddl" },
      { label: "PDDL → Mermaid", path: "/converters/pddl-to-mermaid" },
      { label: "Natural Language → PDDL", path: "/converters/natural-to-pddl" },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen p-4 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <img 
            src={VisionSpaceEyeBlack} 
            alt="VisionSpace"
            className="w-6 h-6 dark:hidden"
          />
          <img 
            src={VisionSpaceEyeWhite} 
            alt="VisionSpace"
            className="w-6 h-6 hidden dark:block"
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pianista</h2>
        </div>
        <DarkModeToggle />
      </div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {item.label}
                </button>
                {openMenus[item.label] && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className={`block px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-700 ${
                          location.pathname === child.path
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 ${
                  location.pathname === item.path
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
      
      {/* VisionSpace Branding at bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <a href="https://visionspace.com/" target="_blank" rel="noopener noreferrer">
            <img 
              src={VisionSpaceWordmark2LineBlack} 
              alt="VisionSpace"
              className="h-10 dark:hidden hover:opacity-80 transition-opacity"
            />
            <img 
              src={VisionSpaceWordmark2LineWhite} 
              alt="VisionSpace"
              className="h-10 hidden dark:block hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
    </aside>
  );
}
