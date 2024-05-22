import db, {
  Mesocycle,
  Exercise,
  ExerciseWithDetails,
  Workout,
} from "../database/db";

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

// Function to fetch the active mesocycle
export const fetchActiveMesocycle = async () => {
  try {
    const activeMesocycle = await db
      .table("mesocycles")
      .where({ isActive: true })
      .first();
    return activeMesocycle;
  } catch (error) {
    console.error("Failed to fetch active mesocycle:", error);
    return null;
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
