import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSolve } from "@api";
import { solveSchema } from "@schemas";
import { createFormSubmissionHandler } from "@utils/errorHandling";
import { useToast } from "@hooks";
import { 
  Card, 
  SectionHeader, 
  InfoPanel,
  JobIdDisplay,
  ErrorDisplay,
  ButtonLoading
} from "@components/ui";

export default function SolveForm({
  selectedSolverId = null,
  selectedSolverDetails = null,
  clearSolver,
}) {
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
      
      const processedModelStr = formData.model_str.replace(/\\n/g, '\n');
      
      return postSolve(processedModelStr, parsedParams, selectedSolverId);
    },
    {
      setLoading,
      setError,
      setJobId
    },
    { 
      context: 'solve submission',
      showToast: true,
      toast
    }
  );

  return (
    <Card className="space-y-4">
      <SectionHeader 
        title="Post Minizinc Solve"
        description="Submit a MiniZinc model for solving"
      />

      {selectedSolverDetails && (
        <InfoPanel
          title="Solver Selected:"
          onClear={selectedSolverId !== "or-tools" ? clearSolver : undefined}
        >
          <p className="text-gray-900 dark:text-gray-100">
            <span className="font-semibold">Name:</span>{" "}
            {selectedSolverDetails.name}
          </p>
        </InfoPanel>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Model String *
          </label>
          <textarea
            placeholder="Enter Minizinc model"
            {...register("model_str")}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={6}
          />
          {errors.model_str && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.model_str.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Model Parameters (JSON) *
          </label>
          <textarea
            placeholder='{"param1": value1, "param2": value2}'
            {...register("model_params")}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={4}
          />
          {errors.model_params && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.model_params.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttonBg dark:text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          <ButtonLoading isLoading={loading} loadingText="Submitting...">
            Post Solve
          </ButtonLoading>
        </button>
      </form>

      <JobIdDisplay jobId={jobId} />
      <ErrorDisplay error={error} />
    </Card>
  );
}