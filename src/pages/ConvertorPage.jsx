import MermaidToPddl from "@components/Converters/MermaidToPddl";

export default function ConvertorPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Mermaid → PDDL Converter
          </h1>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <MermaidToPddl />

        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            About Mermaid Conversion
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-3">
              This tool allows you to convert{" "}
              <strong>Mermaid-style diagrams</strong> into <strong>PDDL</strong>{" "}
              automatically. You can optionally provide a domain to guide the
              conversion and specify the number of attempts the service should
              try.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Mermaid Code:</strong> Input your diagram code
                (required).
              </li>
              <li>
                <strong>Domain:</strong> Provide a PDDL domain to improve
                conversion (optional).
              </li>
              <li>
                <strong>Attempts:</strong> Number of retries for conversion
                (default: 1).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
