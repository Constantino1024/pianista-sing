import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { DarkModeToggle, HamburgerButton } from "@components/ui";
import { useSidebar } from "@hooks";
import VisionSpaceEyeBlack from "@assets/visionspace/VisionSpace_eye_Black.png";
import VisionSpaceEyeWhite from "@assets/visionspace/VisionSpace_eye_White.png";
import VisionSpaceWordmark2LineBlack from "@assets/visionspace/VisionSpace_Wordmark_2lines_Black.png";
import VisionSpaceWordmark2LineWhite from "@assets/visionspace/VisionSpace_Wordmark_2lines_White.png";

export const Sidebar = () => {
  const location = useLocation();
  const { isOpen, closeSidebar } = useSidebar();
  const [isDark, setIsDark] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement;
      setIsDark(html.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        const hamburgerButton = event.target.closest('button[aria-label="Toggle menu"]');
        if (sidebar && !sidebar.contains(event.target) && !hamburgerButton) {
          closeSidebar();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeSidebar]);

  const menuItems = [
    {
      title: "Plan Generation",
      items: [
        { name: "Generate Plan", path: "/plan" },
      ],
    },
    {
      title: "Solving",
      items: [
        { name: "Solve Problem", path: "/solve" },
      ],
    },
    {
      title: "Converters",
      items: [
        { name: "All Converters", path: "/converters" },
        { name: "Natural to PDDL", path: "/converters/natural-to-pddl" },
        { name: "Mermaid to PDDL", path: "/converters/mermaid-to-pddl" },
        { name: "PDDL to Mermaid", path: "/converters/pddl-to-mermaid" },
      ],
    },
    {
      title: "Validators",
      items: [
        { name: "All Validators", path: "/validators" },
        { name: "Validate PDDL", path: "/validators/validate-pddl" },
        { name: "PDDL Match Validator", path: "/validators/pddl-match" },
        { name: "PDDL Plan Validator", path: "/validators/pddl-plan" },
      ],
    },
  ];

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActiveMenu = (items) => {
    return items.some((item) => location.pathname === item.path);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={closeSidebar}
        />
      )}

      <nav
        id="sidebar"
        className={`bg-white dark:bg-gray-800 shadow-lg w-72 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen 
            ? 'fixed left-0 top-0 h-full z-50 translate-x-0 md:relative md:h-screen' 
            : 'fixed left-0 top-0 h-full z-50 -translate-x-full md:hidden'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 md:hidden">
          <Link 
            to="/" 
            onClick={() => {
              if (window.innerWidth < 768) {
                closeSidebar();
              }
            }} 
            className="flex items-center space-x-2"
          >
            <img
              src={isDark ? VisionSpaceEyeWhite : VisionSpaceEyeBlack}
              alt="VisionSpace"
              className="h-8 w-8"
            />
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              Pianista
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <HamburgerButton />
          </div>
        </div>

        <div className="hidden md:block p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={isDark ? VisionSpaceEyeWhite : VisionSpaceEyeBlack}
                alt="VisionSpace"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Pianista
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <HamburgerButton />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-6 space-y-6">
            {menuItems.map((menu) => {
              const isOpen = openMenus[menu.title] || isActiveMenu(menu.items);

              return (
                <div key={menu.title}>
                  <button
                    onClick={() => toggleMenu(menu.title)}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <span>{menu.title}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              closeSidebar();
                            }
                          }}
                          className={`block py-2 px-3 text-sm rounded-md transition-colors duration-200 ${
                            location.pathname === item.path
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


        <div className="p-6 border-t dark:border-gray-700 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <a
              href="https://visionspace.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={isDark ? VisionSpaceWordmark2LineWhite : VisionSpaceWordmark2LineBlack}
                alt="Powered by VisionSpace"
                className="h-8 w-auto"
              />
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Powered by VisionSpace
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
