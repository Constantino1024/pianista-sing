import ApiStatus from "@components/ApiStatus";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <ApiStatus />
      </div>
    </div>
  );
}
