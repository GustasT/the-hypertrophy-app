import { useState, useEffect } from "react";
import {
  fetchActiveMesocycle,
  fetchActiveWorkout,
  fetchExercisesByWorkoutId,
  updateWorkout,
} from "../../services";
import { Workout, ExerciseWithDetails, Mesocycle } from "../../database/db";
import Button from "../../components/common/Button";
import ExerciseItem from "../../components/ExerciseItem";
import { getFromLocalStorage } from "../../utils/localStorageUtils";

const WorkoutPage = () => {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<ExerciseWithDetails[]>([]);
  const [activeMesocycle, setActiveMesocycle] = useState<Mesocycle | null>(
    null
  );
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [isSaveWorkoutButtonActive, setIsSaveWorkoutButtonActive] =
    useState(false);

  const checkUnloggedSets = () => {
    const savedWorkoutSets = getFromLocalStorage(
      `workout-${activeWorkout?.id}-sets`
    );
    if (savedWorkoutSets) {
      // Check if any set has logged: false
      const hasUnloggedSets = Object.values(savedWorkoutSets).some(
        (value: unknown) => {
          // Remove the unused 'index' parameter
          if (Array.isArray(value)) {
            return value.some(
              (set: { reps: number; weight: number; logged: boolean }) =>
                set.logged === false
            );
          }
          return false;
        }
      );
      setIsSaveWorkoutButtonActive(hasUnloggedSets);
    }
  };

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const savedMesocycle = getFromLocalStorage("activeMesocycle");
      const savedWorkoutSets = getFromLocalStorage(
        `workout-${activeWorkout?.id}-sets`
      );
      if (savedMesocycle) {
        setActiveMesocycle(savedMesocycle);
      }
      if (savedWorkoutSets) {
        setExercises((prevExercises) =>
          prevExercises.map((exercise) => ({
            ...exercise,
            sets: savedWorkoutSets[exercise.id!] || exercise.sets,
          }))
        );
        checkUnloggedSets(); // Check for unlogged sets
      }
    };

    const fetchData = async () => {
      try {
        const mesocycle = await fetchActiveMesocycle();
        if (mesocycle) {
          setActiveMesocycle(mesocycle);

          const workout = await fetchActiveWorkout(mesocycle.id!);
          if (workout) {
            setActiveWorkout(workout);

            const exercises = await fetchExercisesByWorkoutId(workout.id!);
            const exercisesWithSets = exercises.map((exercise) => ({
              ...exercise,
              sets:
                exercise.sets && exercise.sets.length > 0
                  ? exercise.sets
                  : [{ reps: 0, weight: 0 }],
            }));
            setExercises(exercisesWithSets);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoadingWorkout(false);
        loadFromLocalStorage(); // Move this call here to ensure activeWorkout is set before it's used
      }
    };

    fetchData();
  }, [activeWorkout?.id]);

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
    if (!exercise.sets[setIndex]) {
      exercise.sets[setIndex] = { reps: 0, weight: 0 };
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
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaveWorkoutButtonActive}
        >
          Finish Workout
        </Button>
      </div>
      {activeMesocycle && !loadingWorkout ? (
        <h2 className="text-xl font-semibold p-4">
          {`${activeMesocycle.name} - Week ${activeWorkout?.week}, Day ${activeWorkout?.day}`}
        </h2>
      ) : (
        <h2 className="text-xl font-semibold p-4">Loading workout info...</h2>
      )}
      <div className="p-4">
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            index={index}
            onInputChange={handleInputChange}
            onRemoveSet={handleRemoveSet}
            workoutId={activeWorkout ? activeWorkout.id! : -1}
            checkUnloggedSets={checkUnloggedSets} // Pass the function to ExerciseItem
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
