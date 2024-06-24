import db, { Exercise, ExerciseWithDetails } from "../database/db";

// Function to add a new exercise
export const addExercise = async (exercise: Exercise) => {
  try {
    // Find the highest existing ID
    const highestId = await db.exercises.orderBy("id").reverse().first();
    const newId = (highestId?.id || 0) + 1;

    // Set the new ID and ensure isDefault is false
    exercise.id = newId;
    exercise.isDefault = false;

    // Add the new exercise
    const id = await db.table("exercises").add(exercise);
    return id;
  } catch (error) {
    console.error("Failed to add exercise:", error);
  }
};

// Function to update an existing exercise
export const updateExercise = async (exercise: Exercise) => {
  try {
    if (exercise.isDefault) {
      console.warn("Default exercises cannot be updated.");
      return;
    }
    await db.table("exercises").put(exercise);
  } catch (error) {
    console.error("Failed to update exercise:", error);
  }
};

// Function to fetch all exercises
export const fetchAllExercises = async () => {
  try {
    await db.populateDefaultExercises(); // Ensure default exercises are added
    const allExercises = await db.table("exercises").toArray();
    return allExercises;
  } catch (error) {
    console.error("Failed to fetch exercises:", error);
    return [];
  }
};

// Function to fetch exercises by workout ID
export const fetchExercisesByWorkoutId = async (
  workoutId: number
): Promise<ExerciseWithDetails[]> => {
  try {
    const workout = await db.table("workouts").get(workoutId);
    if (!workout) {
      throw new Error("Workout not found");
    }

    return workout.exercises;
  } catch (error) {
    console.error("Failed to fetch exercises by workout:", error);
    throw error;
  }
};

// Function to delete an exercise
export const deleteExercise = async (id: number) => {
  try {
    const exercise = await db.exercises.get(id);
    if (exercise?.isDefault) {
      console.warn("Default exercises cannot be deleted.");
      return;
    }
    await db.table("exercises").delete(id);
  } catch (error) {
    console.error("Failed to delete exercise:", error);
  }
};

// Clear local storage exercises
export const clearLocalStorageExercises = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.includes("exercise")) {
      localStorage.removeItem(key);
    }
  });
};
