import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p className="mb-4">This is where your Pianista form will go.</p>

      {/* Example navigation to Result page with id=123 */}
      <Link
        to="/result/123"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Result 123
      </Link>
    </div>
  );
}
