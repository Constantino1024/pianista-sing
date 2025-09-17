import { useState } from "react";
import { postGeneratePddl } from "@api";
import { handleAsyncOperation } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";

export default function GeneratePddl() {
  const [pddlType, setPddlType] = useState("domain");
  const [text, setText] = useState("");
  const [domain, setDomain] = useState("");
  const [generateBoth, setGenerateBoth] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const operation = async () => {
      const prompt = {
        text: normalizePddlText(text),
        domain: domain ? normalizePddlText(domain) : null,
      };

      const { data } = await postGeneratePddl(
        pddlType,
        prompt,
        generateBoth,
        attempts
      );
      return data;
    };

    const result = await handleAsyncOperation(operation, 'PDDL generation', setError);
    if (result) {
      setResult(result);
    }
    setLoading(false);
  };

  const clearForm = () => {
    setText("");
    setDomain("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Generate PDDL from Natural Language
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDDL Type
            </label>
            <select
              value={pddlType}
              onChange={(e) => setPddlType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={generateBoth}
            >
              <option value="domain">Domain</option>
              <option value="problem">Problem</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attempts
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={attempts}
              onChange={(e) => setAttempts(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 pb-3">
              <input
                type="checkbox"
                checked={generateBoth}
                onChange={(e) => setGenerateBoth(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Generate both domain and problem</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Natural Language Prompt *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Describe what you want to model in PDDL. For example: 'Create a blocks world domain where robots can pick up and stack blocks...'"
            rows={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain PDDL (optional)
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Optional: Provide existing domain PDDL to guide problem generation..."
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Used when generating problems or when you want to constrain the
            generation to a specific domain
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {loading ? "Generating..." : "Generate PDDL"}
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
            Generation{" "}
            {result.result_status === "success" ? "Successful" : "Failed"}
          </h3>

          {result.generated_domain && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                Generated Domain:
              </h4>
              <div className="bg-white p-3 rounded border font-mono text-sm overflow-x-auto">
                <pre className="font-mono text-sm text-gray-800 whitespace-pre">
                  {result.generated_domain}
                </pre>
              </div>
            </div>
          )}

          {result.generated_problem && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Generated Problem:
              </h4>
              <div className="bg-white p-3 rounded border font-mono text-sm overflow-x-auto">
                <pre className="font-mono text-sm text-gray-800 whitespace-pre">
                  {result.generated_problem}
                </pre>
              </div>
            </div>
          )}
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
