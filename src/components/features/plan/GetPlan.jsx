import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPlanById } from "@api";
import { getPlanSchema } from "@schemas";
import { usePlanPolling } from "@hooks";

export default function GetPlan() {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [pendingMessage, setPendingMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(getPlanSchema) });

  const polling = usePlanPolling(
    (planId) => getPlanById(planId),
    {
      onSuccess: (data) => {
        setPlan(data);
        setError(null);
        setPendingMessage(null);
      },
      onError: (err) => {
        setError(err.message);
        setPendingMessage(null);
      },
      onPending: (status) => {
        setPendingMessage(
          `Planning in progress... (Attempt ${status.attempt}/${status.maxAttempts}${
            status.nextPollIn ? `, next check in ${status.nextPollIn}s` : ''
          })`
        );
        setError(null);
      }
    }
  );

  const onSubmit = async ({ planId }) => {
    setPlan(null);
    setError(null);
    setPendingMessage(null);
    
    try {
      polling.startPolling(planId);
    } catch (err) {
      setError(err.message || "Failed to start plan polling");
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
          disabled={polling.loading || polling.isPolling}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {polling.loading ? "Starting..." : polling.isPolling ? "Polling..." : "Get Plan"}
        </button>
      </form>

      {plan && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-700 mb-2">Plan Retrieved Successfully</h3>
          <div className="bg-white p-3 rounded border">
            <h4 className="font-semibold mb-2">Generated Plan:</h4>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border overflow-x-auto max-h-96 overflow-y-auto">
              {plan.plan}
            </pre>
          </div>
        </div>
      )}

      {polling.isPolling && !plan && (
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-blue-700">Planning in Progress</p>
              <p className="text-blue-700">{pendingMessage}</p>
              {polling.nextPollIn && (
                <p className="text-sm text-blue-600 mt-1">
                  Next check in {polling.nextPollIn} seconds
                </p>
              )}
            </div>
            <button
              onClick={polling.stopPolling}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 border rounded-lg bg-red-50 border-red-200">
          <p className="font-bold text-red-700">Error</p>
          <p className="text-red-700">{error}</p>
          {polling.hasTimedOut && (
            <p className="text-sm text-red-600 mt-2">
              Polling timed out after {polling.attemptCount} attempts. The plan may still be processing.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
