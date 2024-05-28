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
    // Set all existing mesocycles to inactive
    await db
      .table("mesocycles")
      .toCollection()
      .modify((m) => {
        m.isActive = 0;
      });

    // Create the new mesocycle
    const mesocycleId = (await db.table("mesocycles").add({
      ...mesocycle,
      isActive: 1, // New mesocycle is active
    })) as number;

    const workouts: number[] = [];
    let isFirstWorkout = true;

    for (let week = 1; week <= mesocycle.weeks; week++) {
      for (let dayIndex = 0; dayIndex < mesocycle.timesPerWeek; dayIndex++) {
        const dayExercises = Object.keys(selectedExercises)
          .filter((key) => key.startsWith(`${dayIndex}-`))
          .map((key) => selectedExercises[key])
          .filter((exercise) => exercise !== null) as ExerciseWithDetails[];

        const workout: Omit<Workout, "id"> = {
          mesocycleId,
          week,
          day: dayIndex + 1, // Increment dayIndex by 1
          exercises: dayExercises.map((exercise) => ({
            ...exercise,
            weightRecommended: 0,
            repsRecommended: 0,
            setsRecommended: 0,
          })),
          completed: 0,
          isActive: isFirstWorkout ? 1 : 0,
        };

        const workoutId = (await db.table("workouts").add(workout)) as number;
        workouts.push(workoutId);

        if (isFirstWorkout) {
          isFirstWorkout = false;
        }
      }
    }

    await db.table("mesocycles").update(mesocycleId, { workouts });
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
