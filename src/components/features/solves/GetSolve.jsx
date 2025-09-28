import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSolveById } from "@api";
import { getSolveSchema } from "@schemas";
import { createFormSubmissionHandler } from "@utils/errorHandling";
import { useToast } from "@hooks";
import { 
  Card, 
  SectionHeader, 
  StatusBadge, 
  ResultDisplay, 
  ResultSection, 
  SolutionDisplay,
  StatisticsDisplay,
  ErrorDisplay,
  ButtonLoading
} from "@components/ui";

export default function GetSolve() {
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(getSolveSchema) });

  const onSubmit = createFormSubmissionHandler(
    (formData) => getSolveById(formData.solveId),
    {
      setLoading,
      setError,
      setResult: setSolution
    },
    { 
      context: 'solution retrieval',
      showToast: true,
      toast
    }
  );

  return (
    <Card className="space-y-4">
      <SectionHeader 
        title="Get MiniZinc Solution"
        description="Retrieve solution details using the solution ID. Note: Solutions may take a few moments to process after submission."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Enter Solution ID"
            {...register("solveId")}
            className="w-full p-3 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
          <ButtonLoading isLoading={loading} loadingText="Fetching Solution...">
            Get Solution
          </ButtonLoading>
        </button>
      </form>

      {solution && (
        <ResultDisplay
          variant="success"
          title="Solution Retrieved Successfully"
        >
          <ResultSection title="Status">
            <StatusBadge
              variant={
                solution.status === "OPTIMAL_SOLUTION" || solution.status === "SATISFIED"
                  ? "success"
                  : solution.status === "UNSATISFIABLE"
                  ? "error"
                  : "warning"
              }
            >
              {solution.status}
            </StatusBadge>
          </ResultSection>

          <ResultSection title="Solution">
            <SolutionDisplay solution={solution.solution} />
          </ResultSection>

          <ResultSection title="Statistics">
            <StatisticsDisplay statistics={solution.statistics} />
          </ResultSection>
        </ResultDisplay>
      )}

      <ErrorDisplay error={error} />
    </Card>
  );
}
