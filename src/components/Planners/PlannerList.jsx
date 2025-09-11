import { useEffect, useState } from "react";
import { getPlanners } from  "../../api/pianista";

export default function Planners() {
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlanners()
      .then((res) => {
        setPlanners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-bold mb-2">Available Planners</h2>
        <p className="text-blue-600">Loading planners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-bold mb-2">Available Planners</h2>
        <p className="text-red-600">Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Available Planners</h2>
      <div className="grid gap-2">
        {planners.map((planner) => (
          <div
            key={planner.id}
            className="p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="font-medium text-gray-900">{planner.name}</div>
            <div className="text-sm text-gray-500">ID: {planner.id}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Found {planners.length} planner(s)
      </div>
    </div>
  );
}
