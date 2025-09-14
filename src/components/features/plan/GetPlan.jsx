import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPlanById } from "@api";

const schema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
});

export default function GetPlan() {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ planId }) => {
    setPlan(null);
    setError(null);
    setSuccessMessage(null);
    setIsOngoing(false);
    setLoading(true);

    try {
      const { data } = await getPlanById(planId);
      setPlan(data);
      setSuccessMessage(data.detail || "Plan Retrieved Successfully");
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 202) {
          setIsOngoing(true);
          setError(
            "Planning process is still ongoing. Please check back later."
          );
        } else if (status === 422) {
          setError("Validation Error: " + JSON.stringify(data.detail));
        } else if (status === 404) {
          setError(data.detail || "Plan not found.");
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
    const planId = getValues("planId");
    if (planId) {
      onSubmit({ planId });
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Get Plan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Enter Plan ID"
            {...register("planId")}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.planId && (
            <p className="text-sm text-red-600 mt-1">{errors.planId.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Fetching Plan..." : "Get Plan"}
        </button>
      </form>

      {plan && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-700 mb-2">{successMessage}</h3>
          <div className="bg-white p-3 rounded border">
            <h4 className="font-semibold mb-2">Generated Plan:</h4>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border overflow-x-auto max-h-96 overflow-y-auto">
              {plan.plan}
            </pre>
          </div>
        </div>
      )}

      {isOngoing && !plan && (
        <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-yellow-700">Plan Not Ready</p>
              <p className="text-yellow-700">{successMessage}</p>
            </div>
            <button
              onClick={handleRetry}
              className="ml-4 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 border rounded-lg bg-red-50 border-red-200">
          <p className="font-bold text-red-700">Error</p>
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
