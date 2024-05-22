import { useState, useEffect } from "react";
import { fetchAllMesocycles, deleteMesocycle } from "../../services/dbService";
import { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import PageHeader from "../../components/common/PageHeader";

const Mesocycles = () => {
  const [mesocycles, setMesocycles] = useState<Mesocycle[]>([]);

  // Fetch mesocycles from IndexedDB when the component mounts
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
      await deleteMesocycle(id);
      setMesocycles(mesocycles.filter((mc) => mc.id !== id));
    } catch (error) {
      console.error("Failed to delete mesocycle:", error);
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
        <MesocyclesList mesocycles={mesocycles} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default Mesocycles;
