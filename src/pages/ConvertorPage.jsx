import MermaidToPddl from "@components/Converters/MermaidToPddl";
import PddlToMermaid from "@components/Converters/PddlToMermaid";

export default function ConvertorPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Converter Tools
          </h1>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mermaid → PDDL Converter
          </h2>
          <MermaidToPddl />

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About Mermaid Conversion
            </h3>
            <div className="prose text-gray-600">
              <p>
                This tool allows you to convert <strong>Mermaid-style diagrams</strong>{" "}
                into <strong>PDDL</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Mermaid Code:</strong> required</li>
                <li><strong>Domain:</strong> optional</li>
                <li><strong>Attempts:</strong> default = 1</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            PDDL → Mermaid Converter
          </h2>
          <PddlToMermaid />

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About PDDL Conversion
            </h3>
            <div className="prose text-gray-600">
              <p>
                This tool allows you to convert <strong>PDDL</strong> into{" "}
                <strong>Mermaid-style diagrams</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>PDDL:</strong> input required</li>
                <li><strong>PDDL Type:</strong> must specify <code>domain</code> or <code>problem</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
