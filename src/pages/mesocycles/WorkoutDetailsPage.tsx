import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkoutById } from "../../services";
import { Workout, ExerciseWithDetails } from "../../database/db";
import { useCurrentView } from "../../contexts/CurrentViewContext"; // Import the context
import AnimatedList from "../../components/common/AnimatedList"; // Import the AnimatedList component

const WorkoutDetailsPage = () => {
  const { workoutId } = useParams<{
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
    <div className="pt-4">
      {loadingWorkout ? (
        <div className="flex justify-center items-center h-full">
          <h2 className="text-xl font-semibold">Loading workout info...</h2>
        </div>
      ) : (
        workout && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {`Week ${workout.week}, Day ${workout.day}`}
            </h2>
            <AnimatedList
              className="space-y-4"
              items={exercises}
              keyExtractor={(exercise) => exercise.id.toString()}
              renderItem={(exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {exercise.name}
                  </h3>
                  <div className="space-y-1">
                    {exercise.sets?.map((set, setIndex) => (
                      <div key={setIndex} className="text-gray-700">
                        <p>
                          <span className="font-semibold">
                            Set {setIndex + 1}:
                          </span>{" "}
                          {set.reps} reps at {set.weight} kg
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
          </div>
        )
      )}
    </div>
  );
};

export default WorkoutDetailsPage;
