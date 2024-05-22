import db, {
  Exercise,
  Mesocycle,
  ExerciseWithDetails,
  Workout,
} from "../database/db";

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

// Function to fetch all templates
export const fetchAllTemplates = async () => {
  try {
    const allTemplates = await db.table("templates").toArray();
    return allTemplates;
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return [];
  }
};

// Function to create a new mesocycle
export const createMesocycle = async (
  mesocycle: Omit<Mesocycle, "id">,
  selectedExercises: { [key: string]: Exercise | null }
) => {
  try {
    const mesocycleId = (await db.table("mesocycles").add(mesocycle)) as number;

    // Create and save workouts, then associate them with the mesocycle
    for (let week = 1; week <= mesocycle.weeks; week++) {
      for (let day = 1; day <= mesocycle.weeks; day++) {
        const isActive = week === 1 && day === 1; // Set the first workout as active
        const workout: Omit<Workout, "id"> = {
          mesocycleId,
          week,
          day,
          exercises: Object.values(selectedExercises).map((exercise) => ({
            ...exercise,
            weightRecommended: 0, // Set the recommended values as needed
            repsRecommended: 0,
            setsRecommended: 0,
          })) as ExerciseWithDetails[],
          completed: false,
          isActive,
        };

        // Save the workout and get the generated ID
        const workoutId = (await db.table("workouts").add(workout)) as number;
        mesocycle.workouts.push(workoutId);
      }
    }

    // Update the mesocycle with the list of workout IDs
    await db
      .table("mesocycles")
      .update(mesocycleId, { workouts: mesocycle.workouts });
    return mesocycleId;
  } catch (error) {
    console.error("Failed to create mesocycle:", error);
    throw error; // Re-throw the error to indicate failure
  }
};

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

// Function to delete a mesocycle and its associated workouts
export const deleteMesocycle = async (mesocycleId: number) => {
  try {
    // Delete all workouts associated with the mesocycle
    await db.table("workouts").where({ mesocycleId }).delete();

    // Delete the mesocycle itself
    await db.table("mesocycles").delete(mesocycleId);

    console.log(
      `Mesocycle ${mesocycleId} and its associated workouts deleted successfully!`
    );
  } catch (error) {
    console.error("Failed to delete mesocycle and its workouts:", error);
  }
};

// Function to fetch all mesocycles
export const fetchAllMesocycles = async () => {
  try {
    const allMesocycles = await db.table("mesocycles").toArray();
    return allMesocycles;
  } catch (error) {
    console.error("Failed to fetch mesocycles:", error);
    return [];
  }
};
