import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSolveById } from "@api";
import { getSolveSchema } from "@schemas";

export default function GetSolve() {
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(getSolveSchema) });

  const onSubmit = async ({ solveId }) => {
    setSolution(null);
    setError(null);
    setIsOngoing(false);
    setLoading(true);

    try {
      const { data } = await getSolveById(solveId);
      setSolution(data);
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 202) {
          setIsOngoing(true);
          setError(
            "Solution is still being processed. Please check back later."
          );
        } else if (status === 422) {
          setError("Validation Error: " + JSON.stringify(data.detail));
        } else if (status === 404) {
          setError(data.detail || "Solution not found.");
        } else {
          setError(`Error ${status}: ${data?.message || JSON.stringify(data)}`);
        }
      } else {
        setError("Network error or server unreachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const solveId = getValues("solveId");
    if (solveId) {
      onSubmit({ solveId });
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Get Minizinc Solution
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Enter Solution ID"
            {...register("solveId")}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.solveId && (
            <p className="text-sm text-red-600 mt-1">
              {errors.solveId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Fetching Solution..." : "Get Solution"}
        </button>
      </form>

      {solution && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-700 mb-2">
            Solution Retrieved Successfully
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold mb-2">Status:</h4>
              <div
                className={`inline-block px-2 py-1 rounded text-sm ${
                  solution.status === "OPTIMAL_SOLUTION" ||
                  solution.status === "SATISFIED"
                    ? "bg-green-100 text-green-800"
                    : solution.status === "UNSATISFIABLE"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {solution.status}
              </div>
            </div>

            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold mb-2">Solution:</h4>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border overflow-x-auto max-h-96 overflow-y-auto">
                {JSON.stringify(solution.solution, null, 2)}
              </pre>
            </div>

            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold mb-2">Statistics:</h4>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border overflow-x-auto max-h-48 overflow-y-auto">
                {JSON.stringify(solution.statistics, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          className={`p-4 border rounded-lg ${
            isOngoing
              ? "bg-yellow-50 border-yellow-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p
                className={`font-bold ${
                  isOngoing ? "text-yellow-700" : "text-red-700"
                }`}
              >
                {isOngoing ? "Solution Not Ready" : "Error"}
              </p>
              <p className={isOngoing ? "text-yellow-700" : "text-red-700"}>
                {error}
              </p>
            </div>
            {isOngoing && (
              <button
                onClick={handleRetry}
                className="ml-4 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
