import { useState, useEffect } from "react";
import {
  fetchAllMesocycles,
  deleteMesocycle,
  setActiveMesocycle,
  fetchActiveWorkout,
  fetchExercisesByWorkoutId,
  fetchActiveMesocycle,
} from "../../services";
import { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import PageHeader from "../../components/common/PageHeader";
import {
  saveToLocalStorage,
  removeWorkoutKeysFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localStorageUtils";

const MesocyclesPage = () => {
  const [mesocycles, setMesocycles] = useState<Mesocycle[]>([]);
  const [activeMesocycle, setActiveMesocycleState] = useState<Mesocycle | null>(
    null
  );

  useEffect(() => {
    const fetchMesocycles = async () => {
      try {
        const allMesocycles = await fetchAllMesocycles();
        setMesocycles(allMesocycles);
      } catch (error) {
        console.error("Failed to fetch mesocycles:", error);
      }
    };

    const fetchActive = async () => {
      try {
        const activeMeso = await fetchActiveMesocycle();
        setActiveMesocycleState(activeMeso);
      } catch (error) {
        console.error("Failed to fetch active mesocycle:", error);
      }
    };

    fetchMesocycles();
    fetchActive();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const mesocycleToDelete = mesocycles.find((mc) => mc.id === id);
      if (mesocycleToDelete?.isActive) {
        removeWorkoutKeysFromLocalStorage();
      }
      await deleteMesocycle(id);
      if (activeMesocycle?.id === id) {
        removeFromLocalStorage("activeMesocycle");
        setActiveMesocycleState(null);
      }
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
        const activeMesocycle = await fetchActiveMesocycle();
        if (activeMesocycle) {
          saveToLocalStorage("activeMesocycle", {
            id: activeMesocycle.id,
            name: activeMesocycle.name,
            weeks: activeMesocycle.weeks,
            timesPerWeek: activeMesocycle.timesPerWeek,
          });

          const exercises = await fetchExercisesByWorkoutId(activeWorkout.id!);
          const sets = exercises.reduce((acc, exercise) => {
            if (exercise.sets && exercise.sets.length > 0) {
              acc[exercise.id!] = exercise.sets.map((set) => ({
                ...set,
                logged: set.reps !== 0 && set.weight !== 0,
              }));
            } else {
              // If the exercise has no sets, add a new set
              acc[exercise.id!] = [
                { reps: "", weight: "", logged: false } as any,
              ];
            }
            return acc;
          }, {} as Record<number, { reps: number; weight: number; logged: boolean }[]>);
          saveToLocalStorage(`workout-${activeWorkout.id}-sets`, sets);
        }
      }

      const allMesocycles = await fetchAllMesocycles();
      setMesocycles(allMesocycles);
      const activeMeso = await fetchActiveMesocycle();
      setActiveMesocycleState(activeMeso);
    } catch (error) {
      console.error("Failed to set mesocycle as active:", error);
    }
  };

  return (
    <>
      <PageHeader
        title="Mesocycles"
        buttonText="New Meso"
        buttonLink="/templates"
      />
      <div className="p-4">
        {mesocycles.length === 0 ? (
          <p>Please create a mesocycle</p>
        ) : !activeMesocycle ? (
          <p>Please activate a mesocycle</p>
        ) : null}
        <MesocyclesList
          mesocycles={mesocycles}
          onDelete={handleDelete}
          onSetActive={handleSetActive}
        />
      </div>
    </>
  );
};

export default MesocyclesPage;
