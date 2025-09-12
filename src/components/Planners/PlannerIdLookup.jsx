import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPlannerById } from "@api";

const schema = z.object({
  plannerId: z.string().min(1, "Planner ID is required"),
});

export default function PlannerLookup() {
  const [planner, setPlanner] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ plannerId }) => {
    setPlanner(null);
    setError(null);
    setLoading(true);

    try {
      const { data } = await getPlannerById(plannerId);
      setPlanner(data);
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422) {
          setError("Validation Error: " + JSON.stringify(data.detail));
        } else if (status === 404) {
          setError(data.detail || "Planner not found.");
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
      <h2 className="text-xl font-semibold text-gray-800">Find Planner</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="text"
          placeholder="Enter planner ID"
          {...register("plannerId")}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.plannerId && (
          <p className="text-sm text-red-600">{errors.plannerId.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-buttonBg text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get Planner"}
        </button>
      </form>

      {planner && (
        <div className="p-4 bg-green-50 border rounded-lg">
          <h3 className="font-bold text-green-700">Planner Found:</h3>
          <p>
            <span className="font-semibold">ID:</span> {planner.id}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {planner.name}
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
