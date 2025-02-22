import db, { Workout, ExerciseWithDetails } from "../database/db";

// Function to fetch the active workout for a specific mesocycle
export const fetchActiveWorkout = async (
  mesocycleId: number
): Promise<Workout | null> => {
  try {
    const activeWorkout = await db
      .table("workouts")
      .where({ mesocycleId, isActive: 1 })
      .first();

    if (!activeWorkout) {
      console.warn("No active workout found.");
      return null;
    }
    return activeWorkout;
  } catch (error) {
    console.error("Failed to fetch active workout:", error);
    return null;
  }
};

// Function to update a workout
export const updateWorkout = async (workout: Workout) => {
  try {
    await db.table("workouts").put({
      ...workout,
      isActive: workout.isActive ? 1 : 0, // Convert to number before saving
    });
    console.log("Workout updated successfully!");
  } catch (error) {
    console.error("Failed to update workout:", error);
    throw error;
  }
};

// Function to log exercise details after completion
export const logExerciseDetails = async (
  workoutId: number,
  exerciseDetails: ExerciseWithDetails
) => {
  try {
    const workout = (await db.table("workouts").get(workoutId)) as Workout;
    const updatedExercises =
      workout.exercises?.map((exercise) =>
        exercise.id === exerciseDetails.id ? exerciseDetails : exercise
      ) ?? [];
    await db
      .table("workouts")
      .update(workoutId, { exercises: updatedExercises });
    console.log(
      `Exercise details for workout ${workoutId} updated successfully!`
    );
  } catch (error) {
    console.error("Failed to log exercise details:", error);
  }
};

// Function to fetch exercises of a workout
export const fetchExercisesByWorkout = async (workoutId: number) => {
  try {
    const exercises = await db
      .table("workoutExercises")
      .where({ workoutId })
      .toArray();
    return exercises;
  } catch (error) {
    console.error("Failed to fetch exercises by workout:", error);
    return [];
  }
};

export const updateWorkoutSets = async (
  workoutId: number,
  exerciseIndex: number,
  sets: { reps: number; weight: number }[]
) => {
  await db.transaction("rw", db.workouts, async () => {
    const workout = await db.workouts.get(workoutId);
    if (workout) {
      const exercises = workout.exercises ?? [];
      if (exercises[exerciseIndex]) {
        exercises[exerciseIndex].sets = sets;
        await db.workouts.update(workoutId, { exercises });
      }
    }
  });
};

// Function to mark the workout as completed
export const completeCurrentWorkout = async (
  currentWorkout: Workout
): Promise<void> => {
  try {
    await db.table("workouts").update(currentWorkout.id!, { completed: 1 });
    console.log("Current workout completed successfully!");
  } catch (error) {
    console.error("Failed to complete current workout:", error);
    throw error;
  }
};

// Function to deactivate the workout
export const deactivateCurrentWorkout = async (
  currentWorkout: Workout
): Promise<void> => {
  try {
    await db.table("workouts").update(currentWorkout.id!, { isActive: 0 });
    console.log("Current workout deactivated successfully!");
  } catch (error) {
    console.error("Failed to deactivate current workout:", error);
    throw error;
  }
};

// Function to activate the next workout within the same mesocycle
export const activateNextWorkout = async (
  currentWorkout: Workout
): Promise<void> => {
  try {
    const nextWorkout = await db
      .table("workouts")
      .where({
        mesocycleId: currentWorkout.mesocycleId,
        id: currentWorkout.id! + 1,
      })
      .first();

    if (nextWorkout) {
      await db.table("workouts").update(nextWorkout.id!, { isActive: 1 });
      console.log("Next workout activated successfully!");
    } else {
      console.log("No next workout found to activate.");
    }
  } catch (error) {
    console.error("Failed to activate next workout:", error);
    throw error;
  }
};

export const fetchWorkoutsByMesocycle = async (
  mesocycleId: number
): Promise<Workout[]> => {
  try {
    const workouts = await db
      .table("workouts")
      .where({ mesocycleId })
      .toArray();
    return workouts;
  } catch (error) {
    console.error("Failed to fetch workouts by mesocycle ID:", error);
    return [];
  }
};

export const fetchWorkoutById = async (
  workoutId: number
): Promise<Workout | null> => {
  try {
    const workout = await db.table("workouts").get(workoutId);
    return workout ?? null;
  } catch (error) {
    console.error("Failed to fetch workout by ID:", error);
    return null;
  }
};
