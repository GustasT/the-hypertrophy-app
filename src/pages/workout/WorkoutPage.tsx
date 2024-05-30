import { useState, useEffect } from "react";
import {
  fetchActiveMesocycle,
  fetchActiveWorkout,
  fetchExercisesByWorkoutId,
  updateWorkout,
} from "../../services";
import { Workout, ExerciseWithDetails } from "../../database/db";
import Button from "../../components/common/Button";
import ExerciseItem from "../../components/ExerciseItem";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorageUtils";

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
            // Ensure each exercise has an initialized sets array
            const exercisesWithSets = exercises.map((exercise) => ({
              ...exercise,
              sets: exercise.sets || [],
            }));
            setExercises(exercisesWithSets);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const savedExercises = getFromLocalStorage("exercises");
    if (savedExercises) {
      setExercises(savedExercises);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      saveToLocalStorage("exercises", exercises);
    }
  }, [exercises]);

  const handleInputChange = (
    exerciseIndex: number,
    setIndex: number,
    field: string,
    value: number
  ) => {
    const updatedExercises = [...exercises];
    const exercise = updatedExercises[exerciseIndex];
    if (!exercise.sets) {
      exercise.sets = [];
    }
    exercise.sets[setIndex] = { ...exercise.sets[setIndex], [field]: value };
    updatedExercises[exerciseIndex] = exercise;
    setExercises(updatedExercises);
  };

  const handleRemoveSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const exercise = updatedExercises[exerciseIndex];
    if (exercise.sets && exercise.sets.length > 1) {
      exercise.sets = exercise.sets.slice(0, -1);
      setExercises(updatedExercises);
    }
  };

  const handleLogSet = (exerciseIndex: number, setIndex: number) => {
    // Implement the logic for logging the set here
    console.log(`Logging set ${setIndex} for exercise ${exerciseIndex}`);
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
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            index={index}
            onInputChange={handleInputChange}
            onRemoveSet={handleRemoveSet}
            onLogSet={handleLogSet}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
