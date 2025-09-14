import ValidatePddl from "@components/Validators/ValidatePddl";
import PddlMatchValidator from "@components/Validators/PddlMatchValidator";
import PddlPlanValidator from "@components/Validators/PddlPlanValidator";

export default function ValidatePddlPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">PDDL Validator</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatePddl />
          <PddlMatchValidator />
        </div>

        <div>
          <PddlPlanValidator />
        </div>

        {/* Optional: Info section about PDDL validation */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            About PDDL Validation
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-3">
              The PDDL Validator helps you verify the syntax, domain-problem match,
              and precomputed plans of your Planning Domain Definition Language files.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Domain</h3>
                <p className="text-sm text-blue-700">
                  Defines predicates, actions, and the planning domain structure.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Problem</h3>
                <p className="text-sm text-green-700">
                  Specifies the initial state, goal conditions, and objects.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Plan</h3>
                <p className="text-sm text-purple-700">
                  Contains the sequence of actions to solve a planning problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
