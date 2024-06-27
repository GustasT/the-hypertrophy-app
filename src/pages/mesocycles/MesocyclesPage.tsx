import { useState, useEffect } from "react";
import {
  fetchAllMesocycles,
  deleteMesocycle,
  fetchActiveMesocycle,
} from "../../services";
import { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import PageHeader from "../../components/common/PageHeader";
import { removeWorkoutKeysFromLocalStorage } from "../../utils/localStorageUtils";
import { setActiveMesocycleAndWorkout } from "../../utils/mesocycleUtils";
import CurrentViewDebug from "../../contexts/CurrentViewDebug";

const MesocyclesPage = () => {
  const [mesocycles, setMesocycles] = useState<Mesocycle[]>([]);
  const [activeMesocycle, setActiveMesocycle] = useState<Mesocycle | null>(
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
        setActiveMesocycle(activeMeso);
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
        setActiveMesocycle(null);
      }
      setMesocycles(mesocycles.filter((mc) => mc.id !== id));
    } catch (error) {
      console.error("Failed to delete mesocycle:", error);
    }
  };

  const handleSetActive = async (id: number) => {
    try {
      await setActiveMesocycleAndWorkout(id);
      const allMesocycles = await fetchAllMesocycles();
      setMesocycles(allMesocycles);
      const activeMeso = await fetchActiveMesocycle();
      setActiveMesocycle(activeMeso);
    } catch (error) {
      console.error("Failed to set mesocycle as active:", error);
    }
  };

  const sortedMesocycles = mesocycles.slice().sort((a, b) => {
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <>
      <PageHeader
        title="Mesocycles"
        buttonText="New Meso"
        buttonLink="/templates"
      />
      <div className="p-4">
        <MesocyclesList
          mesocycles={sortedMesocycles}
          onDelete={handleDelete}
          onSetActive={handleSetActive}
        />
      </div>
      <CurrentViewDebug />
    </>
  );
};

export default MesocyclesPage;
