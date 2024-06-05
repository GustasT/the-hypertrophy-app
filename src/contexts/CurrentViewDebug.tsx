// src/contexts/CurrentViewDebug.tsx
import { useEffect } from "react";
import { useCurrentView } from "./CurrentViewContext";

const CurrentViewDebug = () => {
  const { viewedMesocycleId, viewedWorkoutId } = useCurrentView();

  useEffect(() => {
    console.log("Viewed Mesocycle ID:", viewedMesocycleId);
    console.log("Viewed Workout ID:", viewedWorkoutId);
  }, [viewedMesocycleId, viewedWorkoutId]);

  return null;
};

export default CurrentViewDebug;
