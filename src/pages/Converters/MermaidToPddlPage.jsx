import MermaidToPddl from "@components/Converters/MermaidToPddl";

export default function MermaidToPddlPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Mermaid → PDDL Converter
          </h1>
          <div className="flex space-x-4">
            <a href="/converters" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Converters
            </a>
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <MermaidToPddl />

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About Mermaid Conversion
            </h3>
            <div className="prose text-gray-600">
              <p>
                This tool allows you to convert{" "}
                <strong>Mermaid-style diagrams</strong> into{" "}
                <strong>PDDL</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Mermaid Code:</strong> required
                </li>
                <li>
                  <strong>Domain:</strong> optional - provide existing domain for guidance
                </li>
                <li>
                  <strong>Attempts:</strong> number of conversion attempts (default = 1)
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Supported Mermaid Formats
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-green-700">Flowcharts:</strong>
                <p className="text-gray-700 mt-1">
                  Standard flowchart diagrams with nodes and connections representing states and transitions.
                </p>
              </div>
              <div>
                <strong className="text-green-700">State Diagrams:</strong>
                <p className="text-gray-700 mt-1">
                  State transition diagrams showing different states and the actions that connect them.
                </p>
              </div>
              <div>
                <strong className="text-green-700">Graph Diagrams:</strong>
                <p className="text-gray-700 mt-1">
                  Simple graph structures with labeled nodes and edges representing planning relationships.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              Tips for Better Conversion
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
              <li>Use descriptive node names that represent actions or states clearly</li>
              <li>Label edges with meaningful relationship descriptions (preconditions, effects)</li>
              <li>Keep diagrams focused on a single planning domain</li>
              <li>Provide an optional domain PDDL if you have specific constraints</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}