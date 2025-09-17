import { useState } from "react";
import { postConvertPddlToMermaid } from "@api";
import { handleAsyncOperation } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";

export default function PddlToMermaid() {
  const [pddlType, setPddlType] = useState("domain");
  const [pddl, setPddl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const operation = async () => {
      const normalizedPddl = normalizePddlText(pddl);
      const { data } = await postConvertPddlToMermaid(pddlType, normalizedPddl);
      return data;
    };

    const result = await handleAsyncOperation(operation, 'PDDL to Mermaid conversion', setError);
    if (result) {
      setResult(result);
    }
    setLoading(false);
  };

  const clearForm = () => {
    setPddl("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Convert PDDL → Mermaid
        </h2>
        <button
          type="button"
          onClick={clearForm}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDDL Type
          </label>
          <select
            value={pddlType}
            onChange={(e) => setPddlType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="domain">Domain</option>
            <option value="problem">Problem</option>
            <option value="plan">Plan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDDL Content *
          </label>
          <textarea
            value={pddl}
            onChange={(e) => setPddl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Paste your PDDL here..."
            rows={12}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {loading ? "Converting..." : "Convert to Mermaid"}
        </button>
      </form>

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
