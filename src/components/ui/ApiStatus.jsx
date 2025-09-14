import { useEffect, useState } from "react";
import { getRoot } from "@api";

export default function ApiStatus() {
  const [status, setStatus] = useState("Checking Pianista...");
  const [error, setError] = useState(null);

  useEffect(() => {
    getRoot()
      .then((res) => {
        setStatus(res.data.message || "API is working!");
      })
      .catch((err) => {
        setError(err.response?.data || err.message);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-bold mb-2">Pianista Status</h2>
      {error ? (
        <p className="text-red-600">Error: {JSON.stringify(error)}</p>
      ) : (
        <p className="text-green-600">{status}</p>
      )}
    </div>
  );
}
