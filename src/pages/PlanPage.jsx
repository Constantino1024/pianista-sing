import { useState } from "react";
import PlannersListDynamic from "@components/Planners/PlannerListDynamic";
import PlanForm from "@components/Plan/PlanForm";
import GetPlan from "@components/Plan/GetPlan";

export default function Planners() {
  const [selectedPlannerId, setSelectedPlannerId] = useState(null);
  const [selectedPlannerDetails, setSelectedPlannerDetails] = useState(null);

  const handlePlannerSelect = (plannerId, plannerDetails) => {
    setSelectedPlannerId(plannerId);
    setSelectedPlannerDetails(plannerDetails);
  };

  const clearPlannerSelection = () => {
    setSelectedPlannerId(null);
    setSelectedPlannerDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">PDDL Planners</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PlannersListDynamic onPlannerSelect={handlePlannerSelect} />
          </div>
          <div className="lg:col-span-2">
            <PlanForm
              selectedPlannerId={selectedPlannerId}
              selectedPlannerDetails={selectedPlannerDetails}
              clearPlanner={clearPlannerSelection}
            />
          </div>
          <div className="lg:col-span-3">
            <GetPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
