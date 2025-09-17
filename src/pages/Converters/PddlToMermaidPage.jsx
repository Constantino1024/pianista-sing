import PddlToMermaid from "@components/features/converters/PddlToMermaid";
import { SectionLink, BackToHomeLink } from "@components/ui";

export default function PddlToMermaidPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            PDDL → Mermaid Converter
          </h1>
          <div className="flex space-x-4">
            <SectionLink to="/converters" sectionName="Converters" />
            <BackToHomeLink />
          </div>
        </div>

        <div className="space-y-4">
          <PddlToMermaid />

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About PDDL Conversion
            </h3>
            <div className="prose text-gray-600">
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

          <div className="p-6 bg-purple-50 border border-purple-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Visualization Types
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-purple-700">Domain Visualization:</strong>
                <p className="text-gray-700 mt-1">
                  Shows actions, predicates, and their relationships in a structured diagram.
                  Actions are displayed with their preconditions and effects.
                </p>
              </div>
              <div>
                <strong className="text-purple-700">Problem Visualization:</strong>
                <p className="text-gray-700 mt-1">
                  Displays initial state, goal state, and objects in the problem.
                  Shows the problem structure and constraints clearly.
                </p>
              </div>
              <div>
                <strong className="text-purple-700">Plan Visualization:</strong>
                <p className="text-gray-700 mt-1">
                  Creates a step-by-step flow diagram of the plan execution.
                  Shows the sequence of actions and state transitions.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Using the Generated Diagrams
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
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