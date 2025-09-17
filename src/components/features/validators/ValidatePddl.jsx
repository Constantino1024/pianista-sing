import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postValidatePddl } from "@api";
import { validatePddlSchema, PDDL_TYPES } from "@schemas";

export default function ValidatePddl() {
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validatePddlSchema),
  });

const onSubmit = async ({ pddl, pddl_type }) => {
  setValidationResult(null);
  setError(null);
  setLoading(true);

  try {
    const normalizedPddl = pddl.replace(/\\n/g, "\n");

    const { data } = await postValidatePddl(normalizedPddl, pddl_type || null);
    setValidationResult(data);
  } catch (err) {
    if (err.response?.status === 422) {
      const validationErrors = err.response?.data?.detail;
      if (Array.isArray(validationErrors)) {
        const errorMessages = validationErrors
          .map((error) => `${error.loc?.join(".")}: ${error.msg}`)
          .join(", ");
        setError(`Validation Error: ${errorMessages}`);
      } else {
        setError("Validation Error: Invalid request format");
      }
    } else {
      setError(err.response?.data?.message || "Failed to validate PDDL.");
    }
  } finally {
    setLoading(false);
  }
};


  const clearForm = () => {
    reset();
    setValidationResult(null);
    setError(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Validate PDDL</h2>
        <button
          type="button"
          onClick={clearForm}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDDL Type (Optional)
          </label>
          <select
            {...register("pddl_type")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDDL Content *
          </label>
          <textarea
            {...register("pddl")}
            placeholder="Enter your PDDL content here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={15}
          />
          {errors.pddl && (
            <p className="text-sm text-red-600 mt-1">{errors.pddl.message}</p>
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
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <h3
            className={`font-bold text-lg mb-3 ${
              validationResult.result === "success"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            Validation{" "}
            {validationResult.result === "success" ? "Successful" : "Failed"}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  validationResult.result === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {validationResult.result.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">
                Detected PDDL Type:
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 font-medium">
                {validationResult.pddl_type || "None"}
              </span>
            </div>

            <div className="bg-white p-3 rounded border">
              <span className="font-semibold text-gray-700">Message:</span>
              <p
                className={`mt-2 ${
                  validationResult.result === "success"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {validationResult.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
