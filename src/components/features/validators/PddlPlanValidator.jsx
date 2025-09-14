import { useState } from "react";
import { postValidatePddlPlan } from "@api";

export default function PddlPlanValidator() {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const normalizedDomain = domain
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n");
      const normalizedProblem = problem
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n");
      const normalizedPlan = plan.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");

      const { data } = await postValidatePddlPlan(
        normalizedDomain,
        normalizedProblem,
        normalizedPlan
      );
      setResult(data);
    } catch (err) {
      if (err.response?.status === 422) {
        setError(
          "Validation Error: " + JSON.stringify(err.response.data.detail)
        );
      } else {
        setError(err.response?.data?.message || "Failed to validate the plan.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setDomain("");
    setProblem("");
    setPlan("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Validate Problem Plan
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
            Domain PDDL *
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={6}
            placeholder="Paste your DOMAIN PDDL here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Problem PDDL *
          </label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={6}
            placeholder="Paste your PROBLEM PDDL here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan *
          </label>
          <textarea
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={6}
            placeholder="Paste your PLAN here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {loading ? "Validating..." : "Validate Plan"}
        </button>
      </form>

      {result && (
        <div
          className={`p-4 border rounded-lg ${
            result.result === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <h3
            className={`font-bold text-lg mb-3 ${
              result.result === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            Validation {result.result === "success" ? "Successful" : "Failed"}
          </h3>

          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-700">Status:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.result === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {result.result.toUpperCase()}
              </span>
            </p>
            <p>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700">
                  Detected PDDL Type:
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 font-medium">
                  {result.pddl_type || "None"}
                </span>
              </div>
            </p>
            <div className="bg-white p-3 rounded border">
              <span className="font-semibold text-gray-700">Message:</span>
              <p
                className={`mt-2 ${
                  result.result === "success"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {result.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
