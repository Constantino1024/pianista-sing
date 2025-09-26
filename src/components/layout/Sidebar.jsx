import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

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
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Pianista</h2>
      <nav className="space-y-2">
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
    </aside>
  );
}
