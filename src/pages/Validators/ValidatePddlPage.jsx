import ValidatePddl from "@components/Validators/ValidatePddl";

export default function ValidatePddlPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            PDDL Syntax Validator
          </h1>
          <div className="flex space-x-4">
            <a href="/validators" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Validators
            </a>
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <ValidatePddl />

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About PDDL Syntax Validation
            </h3>
            <div className="prose text-gray-600">
              <p>
                This tool validates the <strong>syntax and structure</strong> of your{" "}
                <strong>PDDL domain and problem files</strong> to ensure they conform to PDDL standards.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Domain Validation:</strong> Checks predicates, actions, types, and overall domain structure
                </li>
                <li>
                  <strong>Problem Validation:</strong> Validates initial state, goal conditions, and object declarations
                </li>
                <li>
                  <strong>Error Reporting:</strong> Provides detailed feedback on syntax errors and structural issues
                </li>
                <li>
                  <strong>PDDL Standards:</strong> Ensures compliance with PDDL language specifications
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Common Syntax Issues
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-blue-700">Domain Structure:</strong>
                <p className="text-gray-700 mt-1">
                  Missing required sections like (:requirements), incorrect predicate definitions,
                  or malformed action schemas with invalid preconditions or effects.
                </p>
              </div>
              <div>
                <strong className="text-blue-700">Problem Structure:</strong>
                <p className="text-gray-700 mt-1">
                  Incorrect object declarations, malformed initial state facts,
                  or goal conditions that don't follow proper PDDL syntax.
                </p>
              </div>
              <div>
                <strong className="text-blue-700">Common Errors:</strong>
                <p className="text-gray-700 mt-1">
                  Unmatched parentheses, undefined predicates or types, incorrect variable usage,
                  or missing domain references in problem files.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Validation Process
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                The syntax validator performs comprehensive checks:
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Lexical Analysis:</strong> Validates tokens, keywords, and identifiers</li>
                <li><strong>Structural Validation:</strong> Checks overall file structure and required sections</li>
                <li><strong>Semantic Checks:</strong> Verifies logical consistency within the file</li>
                <li><strong>Standard Compliance:</strong> Ensures adherence to PDDL language specifications</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}