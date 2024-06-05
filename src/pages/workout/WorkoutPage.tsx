import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchActiveMesocycle,
  fetchActiveWorkout,
  fetchExercisesByWorkoutId,
  updateWorkout,
  completeCurrentWorkout,
  deactivateCurrentWorkout,
  activateNextWorkout,
  setMesocycleCompleted,
} from "../../services";
import db from "../../database/db"; // Import the Dexie db instance
import { Workout, ExerciseWithDetails, Mesocycle } from "../../database/db";

import ExerciseItem from "./ExerciseItem";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorageUtils";
import PageHeader from "../../components/common/PageHeader"; // Import the PageHeader component

const WorkoutPage = () => {
  const navigate = useNavigate();
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<ExerciseWithDetails[]>([]);
  const [activeMesocycle, setActiveMesocycle] = useState<Mesocycle | null>(
    null
  );
  const [loadingWorkout, setLoadingWorkout] = useState(true);
  const [isFinishWorkoutButtonDisabled, setIsFinishWorkoutButtonDisabled] =
    useState(true);

  const checkUnloggedSets = () => {
    const savedWorkoutSets = getFromLocalStorage(
      `workout-${activeWorkout?.id}-sets`
    );
    if (savedWorkoutSets) {
      const hasUnloggedSets = Object.values(savedWorkoutSets).some(
        (value: unknown) => {
          if (Array.isArray(value)) {
            return value.some(
              (set: { reps: number; weight: number; logged: boolean }) =>
                set.logged === false
            );
          }
          return false;
        }
      );
      setIsFinishWorkoutButtonDisabled(hasUnloggedSets);
    }
  };

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
      checkUnloggedSets();
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
      } else {
        navigate("/mesocycles"); // Redirect if no active mesocycle
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      navigate("/mesocycles"); // Redirect on error
    } finally {
      setLoadingWorkout(false);
      loadFromLocalStorage();
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeWorkout?.id, navigate]);

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
        await completeCurrentWorkout(activeWorkout); // Complete the current workout

        // Find the next workout within the same mesocycle
        const nextWorkout = await db
          .table("workouts")
          .where({
            mesocycleId: activeWorkout.mesocycleId,
            id: activeWorkout.id! + 1,
          })
          .first();

        if (nextWorkout) {
          await deactivateCurrentWorkout(activeWorkout); // Deactivate the current workout
          removeFromLocalStorage(`workout-${activeWorkout.id}-sets`); // Remove the current workout sets from local storage

          const exercises = await fetchExercisesByWorkoutId(nextWorkout.id!);
          const sets = exercises.reduce((acc, exercise) => {
            if (exercise.sets && exercise.sets.length > 0) {
              acc[exercise.id!] = exercise.sets.map((set) => ({
                ...set,
                logged: set.reps !== 0 && set.weight !== 0,
              }));
            } else {
              acc[exercise.id!] = [
                { reps: "", weight: "", logged: false } as any,
              ];
            }
            return acc;
          }, {} as Record<number, { reps: number; weight: number; logged: boolean }[]>);
          saveToLocalStorage(`workout-${nextWorkout.id}-sets`, sets); // Save the next workout sets to local storage

          await activateNextWorkout(activeWorkout); // Activate the next workout
          console.log("Workout updated successfully!");
          setActiveWorkout(nextWorkout); // Update the state with the next workout
          setExercises(exercises); // Update the state with the next workout exercises
        } else {
          console.log(
            "No next workout found to activate. Setting mesocycle as completed."
          );
          await setMesocycleCompleted(activeWorkout.mesocycleId!); // Complete the mesocycle
        }
      } catch (error) {
        console.error("Failed to update workout:", error);
      }
    }
  };

  return (
    <div>
      <PageHeader
        title="Workout"
        buttonText="Finish Workout"
        buttonAction={handleSave}
        buttonDisabled={isFinishWorkoutButtonDisabled} // Pass the disabled state
      />
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
            checkUnloggedSets={checkUnloggedSets}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPage;
