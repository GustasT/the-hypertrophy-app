import db, {
  Mesocycle,
  Exercise,
  ExerciseWithDetails,
  Workout,
} from "../database/db";

// Function to fetch the active mesocycle
export const fetchActiveMesocycle = async (): Promise<Mesocycle | null> => {
  try {
    const activeMesocycle = await db
      .table("mesocycles")
      .where("isActive")
      .equals(1)
      .first();

    if (!activeMesocycle) {
      console.warn("No active mesocycle found.");
      return null;
    }
    return {
      ...activeMesocycle,
      isActive: activeMesocycle.isActive === 1, // Convert back to boolean
    };
  } catch (error) {
    console.error("Failed to fetch active mesocycle:", error);
    return null;
  }
};

// Function to create a new mesocycle
export const createMesocycle = async (
  mesocycle: Omit<Mesocycle, "id">,
  selectedExercises: { [key: string]: Exercise | null }
) => {
  try {
    const mesocycleId = (await db.table("mesocycles").add({
      ...mesocycle,
      isActive: mesocycle.isActive ? 1 : 0,
    })) as number;

    for (let week = 1; week <= mesocycle.weeks; week++) {
      for (let day = 1; day <= mesocycle.weeks; day++) {
        const isActive = week === 1 && day === 1 ? 1 : 0;
        const workout: Omit<Workout, "id"> = {
          mesocycleId,
          week,
          day,
          exercises: Object.values(selectedExercises).map((exercise) => ({
            ...exercise,
            weightRecommended: 0,
            repsRecommended: 0,
            setsRecommended: 0,
          })) as ExerciseWithDetails[],
          completed: false,
          isActive,
        };

        const workoutId = (await db.table("workouts").add(workout)) as number;
        mesocycle.workouts.push(workoutId);
      }
    }

    await db
      .table("mesocycles")
      .update(mesocycleId, { workouts: mesocycle.workouts });
    return mesocycleId;
  } catch (error) {
    console.error("Failed to create mesocycle:", error);
    throw error;
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
