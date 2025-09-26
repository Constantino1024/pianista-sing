import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postValidatePddl } from "@api";
import { validatePddlSchema, PDDL_TYPES } from "@schemas";
import { createFormSubmissionHandler } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";
import { useToast } from "@hooks";

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
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Validate PDDL</h2>
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
          {loading ? "Validating..." : "Validate PDDL"}
        </button>
      </form>

      {validationResult && (
        <div
          className={`p-4 border rounded-lg ${
            validationResult.result === "success"
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
          }`}
        >
          <h3
            className={`font-bold text-lg mb-3 ${
              validationResult.result === "success"
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            Validation{" "}
            {validationResult.result === "success" ? "Successful" : "Failed"}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  validationResult.result === "success"
                    ? "bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-300"
                }`}
              >
                {validationResult.result.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Detected PDDL Type:
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 font-medium">
                {validationResult.pddl_type || "None"}
              </span>
            </div>

            <div className="bg-white dark:bg-gray-700 p-3 rounded border border-gray-300 dark:border-gray-600">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Message:</span>
              <p
                className={`mt-2 ${
                  validationResult.result === "success"
                    ? "text-green-700 dark:text-green-300"
                    : "text-red-700 dark:text-red-300"
                }`}
              >
                {validationResult.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
