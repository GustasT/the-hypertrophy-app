import db from "../database/db";
import { fetchActiveWorkout, fetchExercisesByWorkoutId } from "../services";
import {
  saveToLocalStorage,
  removeWorkoutKeysFromLocalStorage,
} from "./localStorageUtils";

export const setActiveMesocycleAndWorkout = async (mesocycleId: number) => {
  try {
    removeWorkoutKeysFromLocalStorage();

    // Deactivate all mesocycles
    await db.table("mesocycles").toCollection().modify({ isActive: 0 });

    // Activate the selected mesocycle
    await db.table("mesocycles").update(mesocycleId, { isActive: 1 });

    const activeWorkout = await fetchActiveWorkout(mesocycleId);
    if (activeWorkout) {
      const activeMesocycle = await db.table("mesocycles").get(mesocycleId);
      if (activeMesocycle) {
        const exercises = await fetchExercisesByWorkoutId(activeWorkout.id!);
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
        saveToLocalStorage(`workout-${activeWorkout.id}-sets`, sets);
      }
    }
    console.log("Mesocycle and workout set as active successfully!");
  } catch (error) {
    console.error("Failed to set mesocycle as active:", error);
    throw error;
  }
};
