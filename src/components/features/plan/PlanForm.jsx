import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPlan } from "@api";
import { planSchema } from "@schemas";
import { useToast } from "@hooks";
import { createPlanSubmissionHandler } from "@utils/errorHandling";
import { JobIdDisplay } from "@components/ui/Layout";
import { CopyButton } from "@components/ui";

export default function PlanForm({
  selectedPlannerId = null,
  selectedPlannerDetails = null,
  clearPlanner,
}) {
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(planSchema) });

  const onSubmit = createPlanSubmissionHandler(
    (domain, problem, options) => postPlan(domain, problem, {
      ...options,
      plannerId: selectedPlannerId || options.plannerId
    }),
    {
      setLoading,
      setError,
      setJobId
    },
    {
      showToast: true,
      toast
    }
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Post Plan</h2>

      {selectedPlannerDetails ? (
        <div className="p-4 border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Planner Selected:</h2>
            <button
              onClick={clearPlanner}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
            >
              Clear Selection
            </button>
          </div>
          <div className="space-y-1 text-gray-900 dark:text-gray-100">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedPlannerDetails.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <p>
            <span className="font-semibold">No planner selected.</span> A
            suitable planner will be chosen automatically.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <textarea
          placeholder="Enter PDDL domain"
          {...register("domain")}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          rows={4}
        />
        {errors.domain && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.domain.message}</p>
        )}

        <textarea
          placeholder="Enter PDDL problem"
          {...register("problem")}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          rows={4}
        />
        {errors.problem && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.problem.message}</p>
        )}

        <label className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
          <input
            type="checkbox"
            {...register("convertRealTypes")}
            defaultChecked
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <span>Convert real types</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttonBg dark:text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Post Plan"}
        </button>
      </form>

      {jobId && (
        <JobIdDisplay jobId={jobId} label="Plan Job ID" />
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
