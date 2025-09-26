import { useApiData } from "@utils/apiUtils";

export default function ResourceList({ 
  title, 
  fetchFunction, 
  renderItem, 
  emptyMessage = "No items found",
  onSelect 
}) {
  const { data, loading, error } = useApiData(fetchFunction);
  
  const items = Array.isArray(data) ? data : [];

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-blue-600 dark:text-blue-400">Loading {title.toLowerCase()}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      ) : (
        <>
          <div className="grid gap-2">
            {items.map((item) => renderItem(item, onSelect))}
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Found {items.length} item(s)
          </div>
        </>
      )}
    </div>
  );
}
