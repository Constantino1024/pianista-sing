import { Link } from "react-router-dom";
import ApiStatus from "@components/ui/ApiStatus";
import VisionSpaceWordmark1LineBlack from "@assets/visionspace/VisionSpace_Wordmark_1line_Black.png";
import VisionSpaceWordmark1LineWhite from "@assets/visionspace/VisionSpace_Wordmark_1line_White.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <ApiStatus />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              PDDL Planning
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create and manage PDDL planning tasks with various planners.
            </p>
            <Link
              to="/planners"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Planner
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              MiniZinc Solving
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Solve optimization problems using MiniZinc with different solvers.
            </p>
            <Link
              to="/solvers"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Solver
            </Link>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              PDDL Validators
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Validate PDDL content and ensure it meets the required standards.
            </p>
            <Link
              to="/validators"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to PDDL Validators
            </Link>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Converters
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Convert diagrams, models and natural language into PDDL format
              easily.
            </p>
            <Link
              to="/converters"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Converters
            </Link>
          </div>
        </div>
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center">
            <a
              href="https://visionspace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={VisionSpaceWordmark1LineBlack}
                alt="VisionSpace"
                className="h-8 dark:hidden hover:opacity-80 transition-opacity"
              />
              <img
                src={VisionSpaceWordmark1LineWhite}
                alt="VisionSpace"
                className="h-8 hidden dark:block hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
