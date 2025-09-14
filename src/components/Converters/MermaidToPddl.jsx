import { useState } from "react";
import { postConvertMermaidToPddl } from "@api";

export default function MermaidToPddl() {
  const [mermaid, setMermaid] = useState("");
  const [domain, setDomain] = useState("");
  const [attempts, setAttempts] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data } = await postConvertMermaidToPddl(
        mermaid.replace(/\\n/g, "\n").replace(/\r\n/g, "\n"),
        domain || null,
        attempts
      );
      setResult(data);
    } catch (err) {
      if (err.response?.status === 422) {
        setError(
          "Validation Error: " + JSON.stringify(err.response.data.detail)
        );
      } else {
        setError(err.response?.data?.message || "Failed to convert Mermaid.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Convert Mermaid → PDDL</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mermaid Code
          </label>
          <textarea
            value={mermaid}
            onChange={(e) => setMermaid(e.target.value)}
            className="w-full h-40 p-2 border rounded font-mono text-sm"
            placeholder="Paste Mermaid diagram code here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain (optional)
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full h-24 p-2 border rounded font-mono text-sm"
            placeholder="Optional domain PDDL to guide conversion..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attempts
          </label>
          <input
            type="number"
            min="1"
            value={attempts}
            onChange={(e) => setAttempts(Number(e.target.value))}
            className="w-24 p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p>
            <span className="font-medium">Result Status:</span>{" "}
            <span
              className={
                result.result_status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {result.result_status}
            </span>
          </p>
          <div className="mt-2">
            <span className="font-medium">Conversion Result:</span>
            <pre className="mt-1 p-2 bg-white border rounded text-sm font-mono overflow-x-auto">
              {result.conversion_result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
