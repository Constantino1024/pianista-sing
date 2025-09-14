import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSolve } from "@api";

const schema = z.object({
  model_str: z.string().min(1, "Model is required"),
  model_params: z.string().min(1, "Model parameters are required"),
});

export default function SolveForm({
  selectedSolverId = null,
  selectedSolverDetails = null,
  clearSolver,
}) {
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      model_params: "{}",
    },
  });

  const onSubmit = async ({ model_str, model_params }) => {
    setJobId(null);
    setError(null);
    setLoading(true);

    try {
      let parsedParams;
      try {
        parsedParams = JSON.parse(model_params);
      } catch (parseError) {
        setError(
          `Invalid JSON format in model parameters: ${parseError.message}`
        );
        setLoading(false);
        return;
      }

      // Pass solver ID as third parameter (becomes query parameter solver_name)
      const { data } = await postSolve(model_str, parsedParams, selectedSolverId);
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
          setError("Validation Error: Invalid solver ID format");
        }
      } else {
        setError(err.response?.data?.detail || "Failed to submit solve.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Post Minizinc Solve
      </h2>

      {selectedSolverDetails && (
        <div className="p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Solver Selected:</h2>
            {selectedSolverId !== "or-tools" && clearSolver && (
              <button
                onClick={clearSolver}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Clear Selection
              </button>
            )}
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedSolverDetails.name}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model String *
          </label>
          <textarea
            placeholder="Enter Minizinc model"
            {...register("model_str")}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
          {errors.model_str && (
            <p className="text-sm text-red-600">{errors.model_str.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model Parameters (JSON) *
          </label>
          <textarea
            placeholder='{"param1": value1, "param2": value2}'
            {...register("model_params")}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          {errors.model_params && (
            <p className="text-sm text-red-600">
              {errors.model_params.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttonBg py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Post Solve"}
        </button>
      </form>

      {jobId && (
        <div className="p-4 bg-green-50 border rounded-lg">
          <h3 className="font-bold text-green-700">Solve Submitted</h3>
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