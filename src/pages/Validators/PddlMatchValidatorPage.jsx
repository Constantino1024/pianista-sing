import PddlMatchValidator from "@components/features/validators/PddlMatchValidator";
import { SectionLink, BackToHomeLink } from "@components/ui";

export default function PddlMatchValidatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Domain-Problem Matcher
          </h1>
          <div className="flex space-x-4">
            <SectionLink to="/validators" sectionName="Validators" />
            <BackToHomeLink />
          </div>
        </div>

        <div className="space-y-4">
          <PddlMatchValidator />

          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              About Domain-Problem Compatibility
            </h3>
            <div className="prose text-gray-600 dark:text-gray-400">
              <p>
                This tool verifies that your <strong>problem file is compatible</strong> with your{" "}
                <strong>domain file</strong>, ensuring they can work together for planning.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Domain Reference:</strong> Checks if the problem correctly references the domain
                </li>
                <li>
                  <strong>Object Types:</strong> Validates that all objects are of types defined in the domain
                </li>
                <li>
                  <strong>Predicate Usage:</strong> Ensures all predicates used in the problem are defined in the domain
                </li>
                <li>
                  <strong>Action Applicability:</strong> Verifies that domain actions can be applied to problem objects
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
              Compatibility Checks
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-green-700 dark:text-green-300">Type Compatibility:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Validates that all objects declared in the problem belong to types that exist
                  in the domain's type hierarchy. Checks for proper type inheritance.
                </p>
              </div>
              <div>
                <strong className="text-green-700 dark:text-green-300">Predicate Validation:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Ensures all predicates used in initial state and goals are properly defined
                  in the domain with correct arity and parameter types.
                </p>
              </div>
              <div>
                <strong className="text-green-700 dark:text-green-300">Domain Reference:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Confirms that the problem file correctly references the domain name
                  and that both files are designed to work together.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
              Common Compatibility Issues
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                Watch out for these frequent domain-problem mismatches:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Undefined Types:</strong> Objects declared with types not defined in the domain</li>
                <li><strong>Missing Predicates:</strong> Initial state or goals using predicates not in the domain</li>
                <li><strong>Wrong Domain Name:</strong> Problem references a different domain name</li>
                <li><strong>Type Mismatch:</strong> Predicates used with incorrect parameter types</li>
                <li><strong>Missing Requirements:</strong> Domain doesn't support features used in the problem</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}