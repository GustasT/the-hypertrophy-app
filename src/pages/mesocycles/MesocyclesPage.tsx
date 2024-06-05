import { useState, useEffect } from "react";
import {
  fetchAllMesocycles,
  deleteMesocycle,
  fetchActiveMesocycle,
} from "../../services";
import { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import PageHeader from "../../components/common/PageHeader";
import {
  removeWorkoutKeysFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localStorageUtils";
import { setActiveMesocycleAndWorkout } from "../../utils/mesocycleUtils"; // Import the utility function
import CurrentViewDebug from "../../contexts/CurrentViewDebug";

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
      await setActiveMesocycleAndWorkout(id); // Use the utility function
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
      <CurrentViewDebug />
    </>
  );
};

export default MesocyclesPage;
