// src/components/common/ResourceLookup.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function ResourceLookup({
  title,
  fieldName = "resourceId",
  placeholder = "Enter ID",
  fetchFunction,
  renderResult,
}) {
  const schema = z.object({
    [fieldName]: z.string().min(1, `${title} ID is required`),
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    const id = formData[fieldName];
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const { data } = await fetchFunction(id);
      setResult(data);
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422) {
          setError("Validation Error: " + JSON.stringify(data.detail));
        } else if (status === 404) {
          setError(data.detail || `${title} not found.`);
        } else {
          setError(`Error ${status}: ${data?.message || JSON.stringify(data)}`);
        }
      } else {
        setError("Network error or server unreachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Find {title}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="text"
          placeholder={placeholder}
          {...register(fieldName)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors[fieldName] && (
          <p className="text-sm text-red-600">{errors[fieldName].message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttonBg text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Loading..." : `Get ${title}`}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-green-50 border rounded-lg">
          {renderResult(result)}
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
