import { useEffect, useState } from "react";

export default function ResourceList({ 
  title, 
  fetchFunction, 
  renderItem, 
  emptyMessage = "No items found",
  onSelect 
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFunction()
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data || err.message);
        setLoading(false);
      });
  }, [fetchFunction]);

  if (loading) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-blue-600">Loading {title.toLowerCase()}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-red-600">Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">{emptyMessage}</p>
      ) : (
        <>
          <div className="grid gap-2">
            {items.map((item) => renderItem(item, onSelect))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Found {items.length} item(s)
          </div>
        </>
      )}
    </div>
  );
}
