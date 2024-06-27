import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate, Outlet } from "react-router-dom";
import { fetchMesocycleById, fetchWorkoutsByMesocycle } from "../../services";
import { Mesocycle, Workout } from "../../database/db";
import { useCurrentView } from "../../contexts/CurrentViewContext"; // Import the context
import Button from "../../components/common/Button"; // Import the Button component
import CurrentViewDebug from "../../contexts/CurrentViewDebug";
import PageHeader from "../../components/common/PageHeader"; // Import the PageHeader component

const MesocycleWorkoutsPage = () => {
  const { mesocycleId } = useParams<{ mesocycleId: string }>();
  const { setViewedMesocycleId, setViewedWorkoutId, viewedWorkoutId } =
    useCurrentView(); // Use the context
  const [mesocycle, setMesocycle] = useState<Mesocycle | null>(null);
  const [workoutsByWeek, setWorkoutsByWeek] = useState<{
    [week: number]: Workout[];
  }>({});
  const [mesocycleExists, setMesocycleExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mesocycleId) {
          const fetchedMesocycle = await fetchMesocycleById(
            Number(mesocycleId)
          );
          if (!fetchedMesocycle) {
            setMesocycleExists(false);
            return;
          }
          setMesocycle(fetchedMesocycle);
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
    <>
      <PageHeader title={` ${mesocycle?.name} history`} />
      <div className="p-4">
        {mesocycleExists ? (
          <div>
            <div className="flex justify-between ">
              {Object.entries(workoutsByWeek).map(([week, weekWorkouts]) => (
                <div key={week} className="flex-grow flex-shrink-0 ">
                  <h2 className="font-semibold text-center mb-2 ">
                    Week {week}
                  </h2>
                  <div className="flex flex-col items-center ">
                    {weekWorkouts.map((workout) =>
                      workout.completed ? (
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
                            >
                              Day {workout.day}
                            </Button>
                          )}
                        </NavLink>
                      ) : (
                        <div key={workout.id} className="w-full p-0.5">
                          <Button
                            variant="outline"
                            className="w-full h-10 text-xs"
                            style={{ padding: "0", margin: "0" }}
                            disabled
                          >
                            Day {workout.day}
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Outlet /> {/* This renders the nested WorkoutDetailsPage */}
          </div>
        ) : (
          <h2 className="text-xl font-semibold p-4">Mesocycle not found.</h2>
        )}
        <CurrentViewDebug />
      </div>
    </>
  );
};

export default MesocycleWorkoutsPage;
