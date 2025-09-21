import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPlanById } from "@api";
import { getPlanSchema } from "@schemas";
import { usePlanPolling } from "@hooks";
import { useToast } from "@hooks";
import { 
  Card, 
  SectionHeader, 
  StatusBadge, 
  ResultDisplay, 
  ResultSection, 
  JsonDisplay,
  ErrorDisplay,
  ButtonLoading
} from "@components/ui";
import PlanGanttChart from "./PlanGanttChart";

export default function GetPlan() {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [pendingMessage, setPendingMessage] = useState(null);
  const [viewMode, setViewMode] = useState('gantt'); // 'gantt' or 'json'
  const toast = useToast();

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
        toast.success("Plan retrieved successfully!");
      },
      onError: (err) => {
        setError(err.message);
        setPendingMessage(null);
        toast.error(`Failed to retrieve plan: ${err.message}`);
      },
      onPending: (status) => {
        setPendingMessage(
          `Planning in progress... (Attempt ${status.attempt}/${status.maxAttempts}${
            status.nextPollIn ? `, next check in ${status.nextPollIn}s` : ''
          })`
        );
        setError(null);
        toast.info("Plan is still processing...");
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
    <Card className="space-y-4">
      <SectionHeader 
        title="Get Plan"
        description="Retrieve plan details using the plan ID. Note: Plans may take a few moments to process after submission."
      />

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
          <ButtonLoading 
            isLoading={polling.loading || polling.isPolling} 
            loadingText={polling.loading ? "Starting..." : "Polling..."}
          >
            Get Plan
          </ButtonLoading>
        </button>
      </form>

      {plan && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-green-700">Plan Retrieved Successfully</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('gantt')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'gantt' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Timeline View
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'json' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Raw Data
              </button>
            </div>
          </div>

          {viewMode === 'gantt' ? (
            <PlanGanttChart plan={plan} title="Plan Execution Timeline" />
          ) : (
            <ResultDisplay
              variant="success"
              title="Plan Raw Data"
            >
              <ResultSection title="Generated Plan:">
                <JsonDisplay data={plan.plan} />
              </ResultSection>
            </ResultDisplay>
          )}
        </div>
      )}

      {polling.isPolling && !plan && (
        <ResultDisplay
          variant="info"
          title="Planning in Progress"
        >
          <div className="flex justify-between items-center">
            <div>
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
        </ResultDisplay>
      )}

      {error && (
        <ErrorDisplay error={error}>
          {polling.hasTimedOut && (
            <p className="text-sm text-red-600 mt-2">
              Polling timed out after {polling.attemptCount} attempts. The plan may still be processing.
            </p>
          )}
        </ErrorDisplay>
      )}
    </Card>
  );
}
