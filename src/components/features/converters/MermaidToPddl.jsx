import { useState } from "react";
import { postConvertMermaidToPddl } from "@api";
import { config } from "@config/environment";
import { handleAsyncOperation } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";

export default function MermaidToPddl() {
  const [mermaid, setMermaid] = useState("");
  const [domain, setDomain] = useState("");
  const [attempts, setAttempts] = useState(config.features.converters.defaultAttempts);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleAsyncOperation(
      () => {
        const normalizedMermaid = normalizePddlText(mermaid);
        return postConvertMermaidToPddl(
          normalizedMermaid,
          domain || null,
          attempts
        );
      },
      {
        setLoading,
        setError,
        clearStatesOnStart: [setResult],
        onSuccess: (response) => setResult(response.data),
        context: 'Mermaid to PDDL conversion'
      }
    );
  };

  const clearForm = () => {
    setMermaid("");
    setDomain("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Convert Mermaid → PDDL
        </h2>
        <button
          type="button"
          onClick={clearForm}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mermaid Code *
          </label>
          <textarea
            value={mermaid}
            onChange={(e) => setMermaid(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Paste Mermaid diagram code here..."
            rows={10}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain (optional)
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Optional domain PDDL to guide conversion..."
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attempts
          </label>
          <input
            type="number"
            min="1"
            max={config.features.converters.maxAttempts}
            value={attempts}
            onChange={(e) => setAttempts(Number(e.target.value))}
            className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {loading ? "Converting..." : "Convert to PDDL"}
        </button>
      </div>

      {result && (
        <div
          className={`p-4 border rounded-lg ${
            result.result_status === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <h3
            className={`font-bold text-lg mb-3 ${
              result.result_status === "success"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            Conversion{" "}
            {result.result_status === "success" ? "Successful" : "Failed"}
          </h3>

          <div className="bg-white p-3 rounded border font-mono text-sm overflow-x-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre">
              {result.conversion_result}
            </pre>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
