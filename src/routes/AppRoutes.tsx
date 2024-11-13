import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "../pages/home/Home";
import Templates from "../pages/templates/Templates";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/not_found_page/NotFoundPage";
import Exercises from "../pages/exercises/Exercises";
import WorkoutPage from "../pages/workout/WorkoutPage";
import MesocyclesPage from "../pages/mesocycles/MesocyclesPage";
import MesocycleWorkoutsPage from "../pages/mesocycles/MesocycleWorkoutsPage";
import WorkoutDetailsPage from "../pages/mesocycles/WorkoutDetailsPage";
import { fetchActiveWorkout, fetchActiveMesocycle } from "../services"; // Import as specified

const AppRoutes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hasCheckedOnce = useRef(false); // Add flag to check if navigation logic has run

  useEffect(() => {
    const checkActiveMesocycleAndWorkout = async () => {
      try {
        if (hasCheckedOnce.current) return; // Skip if already checked
        hasCheckedOnce.current = true; // Set flag to true after first check

        console.log("Checking for active mesocycle...");
        const activeMesocycle = await fetchActiveMesocycle();

        if (activeMesocycle) {
          console.log("Active mesocycle found:", activeMesocycle);
          const activeWorkout = await fetchActiveWorkout(activeMesocycle.id);

          if (activeWorkout) {
            console.log("Active workout found:", activeWorkout);
            navigate("/workout");
          }
        }
      } catch (error) {
        console.error("Error checking for active mesocycle or workout:", error);
      } finally {
        setLoading(false); // Set loading to false whether or not workout is found
      }
    };

    checkActiveMesocycleAndWorkout();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator until checks are complete
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="templates" element={<Templates />} />
        <Route path="mesocycles" element={<MesocyclesPage />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="workout" element={<WorkoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="mesocycles/:mesocycleId"
          element={<MesocycleWorkoutsPage />}
        >
          <Route path=":workoutId" element={<WorkoutDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
