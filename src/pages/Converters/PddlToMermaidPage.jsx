import PddlToMermaid from "@components/features/converters/PddlToMermaid";
import { SectionLink, BackToHomeLink } from "@components/ui";

export default function PddlToMermaidPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            PDDL → Mermaid Converter
          </h1>
          <div className="flex space-x-4">
            <SectionLink to="/converters" sectionName="Converters" />
            <BackToHomeLink />
          </div>
        </div>

        <div className="space-y-4">
          <PddlToMermaid />

          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              About PDDL Conversion
            </h3>
            <div className="prose text-gray-600 dark:text-gray-400">
              <p>
                This tool allows you to convert <strong>PDDL</strong> into{" "}
                <strong>Mermaid-style diagrams</strong> for visual representation.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>PDDL Content:</strong> input required - paste your PDDL code
                </li>
                <li>
                  <strong>PDDL Type:</strong> must specify <code>domain</code>,{" "}
                  <code>problem</code>, or <code>plan</code>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-2xl">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">
              Supported PDDL Features
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-purple-700 dark:text-purple-300">Actions:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Each PDDL action becomes a node in the Mermaid flowchart.
                </p>
              </div>
              <div>
                <strong className="text-purple-700 dark:text-purple-300">Predicates:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  State predicates are represented as decision points or conditions.
                </p>
              </div>
              <div>
                <strong className="text-purple-700 dark:text-purple-300">Object Flow:</strong>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  How objects move through the planning domain is visualized as connections.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
              Using the Generated Diagrams
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                The generated Mermaid code can be used in various platforms:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>GitHub/GitLab:</strong> Paste directly into markdown files</li>
                <li><strong>Notion:</strong> Use in Mermaid blocks for documentation</li>
                <li><strong>Mermaid Live Editor:</strong> Visualize and export as images</li>
                <li><strong>Documentation sites:</strong> Integrate with MkDocs, GitBook, etc.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}