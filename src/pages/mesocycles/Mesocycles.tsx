import { useState, useEffect } from "react";
import {
  fetchAllMesocycles,
  deleteMesocycle,
  setActiveMesocycle,
  fetchActiveWorkout,
  fetchExercisesByWorkoutId,
} from "../../services";
import { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import PageHeader from "../../components/common/PageHeader";
import {
  saveToLocalStorage,
  removeWorkoutKeysFromLocalStorage,
} from "../../utils/localStorageUtils";

const Mesocycles = () => {
  const [mesocycles, setMesocycles] = useState<Mesocycle[]>([]);

  useEffect(() => {
    const fetchMesocycles = async () => {
      try {
        const allMesocycles = await fetchAllMesocycles();
        setMesocycles(allMesocycles);
      } catch (error) {
        console.error("Failed to fetch mesocycles:", error);
      }
    };

    fetchMesocycles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const mesocycleToDelete = mesocycles.find((mc) => mc.id === id);
      if (mesocycleToDelete?.isActive) {
        removeWorkoutKeysFromLocalStorage();
      }
      await deleteMesocycle(id);
      setMesocycles(mesocycles.filter((mc) => mc.id !== id));
    } catch (error) {
      console.error("Failed to delete mesocycle:", error);
    }
  };

  const handleSetActive = async (id: number) => {
    try {
      removeWorkoutKeysFromLocalStorage();
      await setActiveMesocycle(id);

      const activeWorkout = await fetchActiveWorkout(id);
      if (activeWorkout) {
        saveToLocalStorage("activeMesocycle", { id });
        const exercises = await fetchExercisesByWorkoutId(activeWorkout.id!);
        const sets = exercises.reduce((acc, exercise) => {
          if (exercise.sets) {
            acc[exercise.id!] = exercise.sets.map((set) => ({
              ...set,
              logged: set.reps !== 0 && set.weight !== 0,
            }));
          }
          return acc;
        }, {} as Record<number, { reps: number; weight: number; logged: boolean }[]>);
        saveToLocalStorage(`workout-${activeWorkout.id}-sets`, sets);
      }

      const allMesocycles = await fetchAllMesocycles();
      setMesocycles(allMesocycles);
    } catch (error) {
      console.error("Failed to set mesocycle as active:", error);
    }
  };

  return (
    <>
      <PageHeader
        title="Mesocycles"
        buttonText="New Meso"
        buttonLink="/newMesocycle"
      />
      <div className="p-4">
        <MesocyclesList
          mesocycles={mesocycles}
          onDelete={handleDelete}
          onSetActive={handleSetActive}
        />
      </div>
    </>
  );
};

export default Mesocycles;
