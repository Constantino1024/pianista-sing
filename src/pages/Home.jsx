import ApiStatus from "@components/ApiStatus";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <ApiStatus />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">PDDL Planning</h2>
            <p className="text-gray-600 mb-4">
              Create and manage PDDL planning tasks with various planners.
            </p>
            <a 
              href="/planners" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Planners
            </a>
          </div>
          
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">MiniZinc Solving</h2>
            <p className="text-gray-600 mb-4">
              Solve optimization problems using MiniZinc with different solvers.
            </p>
            <a 
              href="/solvers" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Solvers
            </a>
          </div>
                    <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">PDDL Validator</h2>
            <p className="text-gray-600 mb-4">
              Validate PDDL content and ensure it meets the required standards.
            </p>
            <a 
              href="/validators" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to PDDL Validator
            </a>
          </div>
                    <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Converters</h2>
            <p className="text-gray-600 mb-4">
              Convert diagrams, models and natural language into PDDL format easily.
            </p>
            <a 
              href="/converters" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Converters
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}