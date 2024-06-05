// src/pages/WorkoutDetailsPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkoutById } from "../../services";
import { Workout, ExerciseWithDetails } from "../../database/db";
import { useCurrentView } from "../../contexts/CurrentViewContext"; // Import the context

const WorkoutDetailsPage = () => {
  const { mesocycleId, workoutId } = useParams<{
    mesocycleId: string;
    workoutId: string;
  }>();
  const { setViewedWorkoutId } = useCurrentView(); // Use the context
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<ExerciseWithDetails[]>([]);
  const [loadingWorkout, setLoadingWorkout] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutData = await fetchWorkoutById(Number(workoutId));
        if (workoutData) {
          setWorkout(workoutData);
          setExercises(workoutData.exercises);
          setViewedWorkoutId(Number(workoutId)); // Set viewed workout ID
        }
      } catch (error) {
        console.error("Failed to fetch workout:", error);
      } finally {
        setLoadingWorkout(false);
      }
    };

    if (workoutId) {
      fetchData();
    }
  }, [workoutId, setViewedWorkoutId]);

  return (
    <div>
      {loadingWorkout ? (
        <h2 className="text-xl font-semibold p-4">Loading workout info...</h2>
      ) : (
        workout && (
          <div>
            <h1>
              Mesocycle {mesocycleId} - Workout {workoutId}
            </h1>
            <h2>{`Week ${workout.week}, Day ${workout.day}`}</h2>
            <div>
              {exercises.map((exercise) => (
                <div key={exercise.id} className="mb-4">
                  <h3 className="text-lg font-semibold">{exercise.name}</h3>
                  <div>
                    {exercise.sets?.map((set, setIndex) => (
                      <div key={setIndex} className="mb-2">
                        <p>
                          Set {setIndex + 1}: {set.reps} reps at {set.weight} kg
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WorkoutDetailsPage;
