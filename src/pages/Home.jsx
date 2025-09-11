import { Link } from "react-router-dom";
import ApiStatus from "../components/ApiStatus";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-4">
      <ApiStatus />
    </div>
  );
}
