import { getRoot } from "@api";
import { useApiData } from "@utils/apiUtils";

export default function ApiStatus() {
  const { data, loading, error } = useApiData(getRoot);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Pianista Status</h2>
      {loading ? (
        <p className="text-blue-600 dark:text-blue-400">Checking Pianista...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      ) : (
        <p className="text-green-600 dark:text-green-400">{data?.message || "API is working!"}</p>
      )}
    </div>
  );
}
