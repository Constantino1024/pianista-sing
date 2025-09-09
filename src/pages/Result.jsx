import { useParams, Link } from "react-router-dom";

export default function Result() {
  const { id } = useParams(); // get ":id" from the URL

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Result Page</h1>
      <p className="mb-4">Showing result for plan ID: <span className="font-mono">{id}</span></p>

      <Link
        to="/"
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
