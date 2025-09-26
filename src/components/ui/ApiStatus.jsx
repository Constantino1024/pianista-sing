import { getRoot } from "@api";
import { useApiData } from "@utils/apiUtils";
import VisionSpaceEyeBlack from "@assets/visionspace/VisionSpace_eye_Black.png";
import VisionSpaceEyeWhite from "@assets/visionspace/VisionSpace White SVG.svg";

export default function ApiStatus() {
  const { data, loading, error } = useApiData(getRoot);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={VisionSpaceEyeBlack}
          alt="VisionSpace"
          className="w-5 h-5 dark:hidden"
        />
        <img
          src={VisionSpaceEyeWhite}
          alt="VisionSpace"
          className="w-5 h-5 hidden dark:block"
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Pianista Status
        </h2>
      </div>
      {loading ? (
        <p className="text-blue-600 dark:text-blue-400">Checking Pianista...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      ) : (
        <p className="text-green-600 dark:text-green-400">
          {data?.message || "API is working!"}
        </p>
      )}
    </div>
  );
}
