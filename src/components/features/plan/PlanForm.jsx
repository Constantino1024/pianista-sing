import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPlan } from "@api";
import { planSchema } from "@schemas";

export default function PlanForm({
  selectedPlannerId = null,
  selectedPlannerDetails = null,
  clearPlanner,
}) {
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(planSchema) });

  const onSubmit = async ({ domain, problem, convertRealTypes }) => {
    setJobId(null);
    setError(null);
    setLoading(true);

    try {
      const { data } = await postPlan(domain, problem, {
        plannerId: selectedPlannerId || undefined,
        convertRealTypes,
      });
      setJobId(data.id);
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response?.data?.detail;
        if (Array.isArray(validationErrors)) {
          const errorMessages = validationErrors
            .map((error) => `${error.loc?.join(".")}: ${error.msg}`)
            .join(", ");
          setError(`Validation Error: ${errorMessages}`);
        } else {
          setError("Validation Error: Invalid plan ID format");
        }
      }
      setError(err.response?.data?.detail || "Failed to submit plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Post Plan</h2>

      {selectedPlannerDetails ? (
        <div className="p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Planner Selected:</h2>
            <button
              onClick={clearPlanner}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Clear Selection
            </button>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedPlannerDetails.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 border rounded bg-gray-50 text-sm text-gray-700">
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
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {errors.domain && (
          <p className="text-sm text-red-600">{errors.domain.message}</p>
        )}

        <textarea
          placeholder="Enter PDDL problem"
          {...register("problem")}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {errors.problem && (
          <p className="text-sm text-red-600">{errors.problem.message}</p>
        )}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("convertRealTypes")}
            defaultChecked
          />
          <span>Convert real types</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttonBg py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Post Plan"}
        </button>
      </form>

      {jobId && (
        <div className="p-4 bg-green-50 border rounded-lg">
          <h3 className="font-bold text-green-700">Plan Submitted</h3>
          <p>
            <span className="font-semibold">Job ID:</span> {jobId}
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border rounded-lg text-red-700">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
