import db, { Exercise } from "../database/db";

// Function to add a new exercise
export const addExercise = async (exercise: Exercise) => {
  try {
    const id = await db.table("exercises").add(exercise);
    return id;
  } catch (error) {
    console.error("Failed to add exercise:", error);
  }
};

// Function to update an existing exercise
export const updateExercise = async (exercise: Exercise) => {
  try {
    await db.table("exercises").put(exercise);
  } catch (error) {
    console.error("Failed to update exercise:", error);
  }
};

// Function to fetch all exercises
export const fetchAllExercises = async () => {
  try {
    const allExercises = await db.table("exercises").toArray();
    return allExercises;
  } catch (error) {
    console.error("Failed to fetch exercises:", error);
    return [];
  }
};

// Function to delete an exercise
export const deleteExercise = async (id: number) => {
  try {
    await db.table("exercises").delete(id);
  } catch (error) {
    console.error("Failed to delete exercise:", error);
  }
};
