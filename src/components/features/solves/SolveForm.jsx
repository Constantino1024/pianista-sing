import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSolve } from "@api";
import { solveSchema } from "@schemas";
import { createFormSubmissionHandler } from "@utils/errorHandling";

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
    resolver: zodResolver(solveSchema),
  });

  const onSubmit = createFormSubmissionHandler(
    (formData) => {
      let parsedParams;
      try {
        parsedParams = JSON.parse(formData.model_params);
      } catch (parseError) {
        throw new Error(`Invalid JSON format in model parameters: ${parseError.message}`);
      }
      
      return postSolve(formData.model_str, parsedParams, selectedSolverId);
    },
    {
      setLoading,
      setError,
      setJobId
    },
    { context: 'solve submission' }
  );

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