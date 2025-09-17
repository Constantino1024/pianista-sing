import { getRoot } from "@api";
import { useApiData } from "@utils/apiUtils";

export default function ApiStatus() {
  const { data, loading, error } = useApiData(getRoot);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-bold mb-2">Pianista Status</h2>
      {loading ? (
        <p className="text-blue-600">Checking Pianista...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <p className="text-green-600">{data?.message || "API is working!"}</p>
      )}
    </div>
  );
}
