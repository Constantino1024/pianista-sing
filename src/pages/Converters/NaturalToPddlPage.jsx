import NaturaltoPddl from "@components/features/converters/NaturalToPddl";
import { SectionLink, BackToHomeLink } from "@components/ui";

export default function NaturalToPddlPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Natural Language → PDDL Converter
          </h1>
          <div className="flex space-x-4">
            <SectionLink to="/converters" sectionName="Converters" />
            <BackToHomeLink />
          </div>
        </div>

        <div className="space-y-4">
          <NaturaltoPddl />
          
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              About Natural Language Generation
            </h3>
            <div className="prose text-gray-600 dark:text-gray-400">
              <p>
                This tool allows you to generate{" "}
                <strong>PDDL domains and problems</strong> from{" "}
                <strong>natural language descriptions</strong> using AI.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Natural Language Prompt:</strong> required - describe
                  your planning domain
                </li>
                <li>
                  <strong>PDDL Type:</strong> choose <code>domain</code> or{" "}
                  <code>problem</code>
                </li>
                <li>
                  <strong>Domain PDDL:</strong> optional - provide existing
                  domain for problem generation
                </li>
                <li>
                  <strong>Generate Both:</strong> option to create both domain
                  and problem together
                </li>
                <li>
                  <strong>Attempts:</strong> number of generation attempts
                  (default = 1)
                </li>
              </ul>
              <p className="mt-3 text-sm">
                <strong>Tip:</strong> Be descriptive in your prompt. Include
                details about objects, actions, predicates, and goals to get
                better results.
              </p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
              Tips for Better Results
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-blue-700 dark:text-blue-300">Be Specific:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Provide clear descriptions of objects, actions, and goals.
                </p>
              </div>
              <div>
                <strong className="text-blue-700 dark:text-blue-300">Use Structure:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Organize your description with clear problem statements and objectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}