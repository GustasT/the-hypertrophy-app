import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMesocycleById, fetchWorkoutsByMesocycle } from "../../services";
import { Workout } from "../../database/db";

const MesocycleWorkoutsPage = () => {
  const { mesocycleId } = useParams<{ mesocycleId: string }>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [mesocycleExists, setMesocycleExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mesocycle = await fetchMesocycleById(Number(mesocycleId));
        if (!mesocycle) {
          setMesocycleExists(false);
          return;
        }
        const workoutsData = await fetchWorkoutsByMesocycle(
          Number(mesocycleId)
        );
        setWorkouts(workoutsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setMesocycleExists(false);
      }
    };

    fetchData();
  }, [mesocycleId]);

  useEffect(() => {
    if (!mesocycleExists) {
      navigate("/notfound");
    }
  }, [mesocycleExists, navigate]);

  return (
    <div>
      {mesocycleExists ? (
        <>
          <h1>Workouts for Mesocycle {mesocycleId}</h1>
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <Link to={`/mesocycles/${mesocycleId}/${workout.id}`}>
                  Workout {workout.id}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2 className="text-xl font-semibold p-4">Mesocycle not found.</h2>
      )}
    </div>
  );
};

export default MesocycleWorkoutsPage;
