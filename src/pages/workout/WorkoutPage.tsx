import { useState, useEffect } from "react";
import {
  fetchActiveMesocycle,
  fetchActiveWorkout,
  fetchExercisesByWorkoutId,
  updateWorkout,
} from "../../services";
import { Workout, ExerciseWithDetails } from "../../database/db";
import Button from "../../components/common/Button";

const WorkoutPage = () => {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<ExerciseWithDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mesocycle = await fetchActiveMesocycle();

        if (mesocycle) {
          const workout = await fetchActiveWorkout(mesocycle.id!);
          setActiveWorkout(workout);

          if (workout) {
            const exercises = await fetchExercisesByWorkoutId(workout.id!);
            setExercises(exercises);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index: number, field: string, value: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setExercises(updatedExercises);
  };

  const handleSave = async () => {
    if (activeWorkout) {
      try {
        await updateWorkout({ ...activeWorkout, exercises });
        console.log("Workout updated successfully!");
      } catch (error) {
        console.error("Failed to update workout:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between sticky top-0 bg-white p-4 border-b">
        <h1 className="text-2xl font-bold">Workout</h1>
        <Button variant="primary" onClick={handleSave}>
          Save Workout
        </Button>
      </div>
      <div className="p-4">
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className="mb-4">
            <h2 className="text-lg font-semibold">{exercise.name}</h2>
            <div className="flex space-x-4">
              <input
                type="number"
                value={exercise.setsRecommended}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "setsRecommended",
                    Number(e.target.value)
                  )
                }
                placeholder="Sets"
                className="border p-2"
              />
              <input
                type="number"
                value={exercise.repsRecommended}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "repsRecommended",
                    Number(e.target.value)
                  )
                }
                placeholder="Reps"
                className="border p-2"
              />
              <input
                type="number"
                value={exercise.weightRecommended}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "weightRecommended",
                    Number(e.target.value)
                  )
                }
                placeholder="Weight"
                className="border p-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
