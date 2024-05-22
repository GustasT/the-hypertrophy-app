import db, { Workout, ExerciseWithDetails } from "../database/db";

// Function to fetch the active workout
export const fetchActiveWorkout = async () => {
  try {
    const activeWorkout = await db
      .table("workouts")
      .where({ isActive: true })
      .first();
    return activeWorkout;
  } catch (error) {
    console.error("Failed to fetch active workout:", error);
    return null;
  }
};

// Function to update a workout
export const updateWorkout = async (workout: Workout) => {
  try {
    await db.table("workouts").update(workout.id!, workout);
    console.log("Workout updated successfully!");
  } catch (error) {
    console.error("Failed to update workout:", error);
  }
};

// Function to log exercise details after completion
export const logExerciseDetails = async (
  workoutId: number,
  exerciseDetails: ExerciseWithDetails
) => {
  try {
    const workout = (await db.table("workouts").get(workoutId)) as Workout;
    const updatedExercises = workout.exercises.map((exercise) =>
      exercise.id === exerciseDetails.id ? exerciseDetails : exercise
    );
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
