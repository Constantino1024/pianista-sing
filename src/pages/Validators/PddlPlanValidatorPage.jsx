import PddlPlanValidator from "@components/features/validators/PddlPlanValidator";
import { SectionLink, BackToHomeLink } from "@components/ui";

export default function PddlPlanValidatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Plan Validator
          </h1>
          <div className="flex space-x-4">
            <SectionLink to="/validators" sectionName="Validators" />
            <BackToHomeLink />
          </div>
        </div>

        <div className="space-y-4">
          <PddlPlanValidator />

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About Plan Validation
            </h3>
            <div className="prose text-gray-600">
              <p>
                This tool validates that your <strong>plan correctly solves</strong> the given{" "}
                <strong>planning problem</strong> according to the domain rules.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Plan Execution:</strong> Simulates each action step-by-step from the initial state
                </li>
                <li>
                  <strong>Precondition Checking:</strong> Verifies all action preconditions are satisfied before execution
                </li>
                <li>
                  <strong>State Transitions:</strong> Tracks how each action modifies the world state
                </li>
                <li>
                  <strong>Goal Achievement:</strong> Confirms the final state satisfies all goal conditions
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-purple-50 border border-purple-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Validation Process
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-purple-700">Initial State Setup:</strong>
                <p className="text-gray-700 mt-1">
                  Begins with the problem's initial state and prepares for action execution.
                  Validates that the starting state is consistent with the problem definition.
                </p>
              </div>
              <div>
                <strong className="text-purple-700">Action-by-Action Validation:</strong>
                <p className="text-gray-700 mt-1">
                  For each action in the plan: checks if preconditions are met, validates parameters,
                  applies effects, and updates the world state accordingly.
                </p>
              </div>
              <div>
                <strong className="text-purple-700">Goal State Verification:</strong>
                <p className="text-gray-700 mt-1">
                  After executing all actions, verifies that the final state satisfies
                  all goal conditions specified in the problem file.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              Common Plan Issues
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                The validator will identify these typical plan problems:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Invalid Actions:</strong> Actions not defined in the domain or with wrong parameters</li>
                <li><strong>Unmet Preconditions:</strong> Attempting actions when preconditions are not satisfied</li>
                <li><strong>Incomplete Plans:</strong> Plans that don't achieve all required goal conditions</li>
                <li><strong>State Inconsistencies:</strong> Actions that create contradictory or impossible states</li>
                <li><strong>Wrong Execution Order:</strong> Actions executed in an order that prevents success</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Using the Validator
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                To validate your plan effectively:
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Provide the domain file that defines available actions and predicates</li>
                <li>Include the problem file with initial state and goal conditions</li>
                <li>Submit your plan as a sequence of parameterized actions</li>
                <li>Review the detailed validation report and any identified issues</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}