import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postValidatePddl } from "@api";
import { validatePddlSchema, PDDL_TYPES } from "@schemas";
import { createFormSubmissionHandler } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";
import { useToast } from "@hooks";
import { 
  Card, 
  SectionHeader, 
  ResultDisplay, 
  StatusBadge,
  CodeBlock,
  ErrorDisplay,
  ButtonLoading
} from "@components/ui";

export default function ValidatePddl() {
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validatePddlSchema),
  });

const onSubmit = createFormSubmissionHandler(
  (formData) => {
    const normalizedPddl = normalizePddlText(formData.pddl);
    return postValidatePddl(normalizedPddl, formData.pddl_type || null);
  },
  {
    setLoading,
    setError,
    setResult: setValidationResult
  },
  { 
    context: 'PDDL validation',
    showToast: true,
    toast
  }
);


  const clearForm = () => {
    reset();
    setValidationResult(null);
    setError(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <SectionHeader 
          title="Validate PDDL"
          description="Validate PDDL domain or problem syntax and format"
        />
        <button
          type="button"
          onClick={clearForm}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Clear
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PDDL Type (Optional)
          </label>
          <select
            {...register("pddl_type")}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Auto-detect</option>
            {PDDL_TYPES.filter(type => type !== "").map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PDDL Content *
          </label>
          <textarea
            {...register("pddl")}
            placeholder="Enter your PDDL content here..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={15}
          />
          {errors.pddl && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.pddl.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <ButtonLoading isLoading={loading} loadingText="Validating...">
            Validate PDDL
          </ButtonLoading>
        </button>
      </form>

      {validationResult && (
        <ResultDisplay
          variant={validationResult.result === "success" ? "success" : "error"}
          title={`Validation ${validationResult.result === "success" ? "Successful" : "Failed"}`}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span>
              <StatusBadge variant={validationResult.result === "success" ? "success" : "error"}>
                {validationResult.result.toUpperCase()}
              </StatusBadge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Detected PDDL Type:</span>
              <StatusBadge variant="info">
                {validationResult.pddl_type || "None"}
              </StatusBadge>
            </div>
            <div>
              <CodeBlock 
                label="Message:"
                variant={validationResult.result === "success" ? "success" : "error"}
              >
                {validationResult.message}
              </CodeBlock>
            </div>
          </div>
        </ResultDisplay>
      )}

      <ErrorDisplay error={error} />
    </Card>
  );
}
