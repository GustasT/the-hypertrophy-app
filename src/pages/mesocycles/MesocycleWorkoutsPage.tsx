import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate, Outlet } from "react-router-dom";
import { fetchMesocycleById, fetchWorkoutsByMesocycle } from "../../services";
import { Workout } from "../../database/db";
import { useCurrentView } from "../../contexts/CurrentViewContext"; // Import the context
import Button from "../../components/common/Button"; // Import the Button component
import CurrentViewDebug from "../../contexts/CurrentViewDebug";

const MesocycleWorkoutsPage = () => {
  const { mesocycleId } = useParams<{ mesocycleId: string }>();
  const { setViewedMesocycleId, setViewedWorkoutId, viewedWorkoutId } =
    useCurrentView(); // Use the context
  const [workoutsByWeek, setWorkoutsByWeek] = useState<{
    [week: number]: Workout[];
  }>({});
  const [mesocycleExists, setMesocycleExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mesocycleId) {
          const mesocycle = await fetchMesocycleById(Number(mesocycleId));
          if (!mesocycle) {
            setMesocycleExists(false);
            return;
          }
          const workoutsData = await fetchWorkoutsByMesocycle(
            Number(mesocycleId)
          );
          setViewedMesocycleId(Number(mesocycleId)); // Set viewed mesocycle ID
          if (!viewedWorkoutId) {
            setViewedWorkoutId(null); // Unset viewed workout ID
          }

          // Organize workouts by weeks
          const workoutsByWeek = workoutsData.reduce(
            (acc: { [week: number]: Workout[] }, workout) => {
              if (!acc[workout.week]) {
                acc[workout.week] = [];
              }
              acc[workout.week].push(workout);
              return acc;
            },
            {}
          );

          setWorkoutsByWeek(workoutsByWeek);
        } else {
          setMesocycleExists(false);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setMesocycleExists(false);
      }
    };

    fetchData();
  }, [mesocycleId, setViewedMesocycleId, setViewedWorkoutId, viewedWorkoutId]);

  useEffect(() => {
    if (!mesocycleExists) {
      navigate("/notfound");
    }
  }, [mesocycleExists, navigate]);

  return (
    <div className="p-4">
      {mesocycleExists ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Workouts for Mesocycle {mesocycleId}
          </h1>
          <div className="flex justify-between ">
            {Object.entries(workoutsByWeek).map(([week, weekWorkouts]) => (
              <div key={week} className="flex-grow flex-shrink-0 ">
                <h2 className="font-semibold text-center mb-2 ">Week {week}</h2>
                <div className="flex flex-col items-center ">
                  {weekWorkouts.map((workout) => (
                    <NavLink
                      key={workout.id}
                      to={`${workout.id}`}
                      onClick={() => setViewedWorkoutId(workout.id ?? null)} // Set viewed workout ID
                      className="w-full p-0.5"
                    >
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "primary" : "outline"}
                          className="w-full h-10 text-xs"
                          style={{ padding: "0", margin: "0" }}
                          disabled={!workout.completed} // Disable if not completed
                        >
                          Day {workout.day}
                        </Button>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Outlet /> {/* This renders the nested WorkoutDetailsPage */}
        </>
      ) : (
        <h2 className="text-xl font-semibold p-4">Mesocycle not found.</h2>
      )}
      <CurrentViewDebug />
    </div>
  );
};

export default MesocycleWorkoutsPage;
