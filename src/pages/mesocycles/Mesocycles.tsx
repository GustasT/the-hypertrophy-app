import { useState, useEffect } from "react";
import db, { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

const Mesocycles = () => {
  const [mesocycles, setMesocycles] = useState<Mesocycle[]>([]);

  // Fetch mesocycles from IndexedDB when the component mounts
  useEffect(() => {
    const fetchMesocycles = async () => {
      try {
        const allMesocycles = await db.table("mesocycles").toArray();
        setMesocycles(allMesocycles);
      } catch (error) {
        console.error("Failed to fetch mesocycles:", error);
      }
    };

    fetchMesocycles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await db.table("mesocycles").delete(id);
      setMesocycles(mesocycles.filter((mc) => mc.id !== id));
    } catch (error) {
      console.error("Failed to delete mesocycle:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Mesocycles</h1>
        <Link to="/newMesocycle">
          <Button variant="primary">New Meso</Button>
        </Link>
      </div>
      <MesocyclesList mesocycles={mesocycles} onDelete={handleDelete} />
    </div>
  );
};

export default Mesocycles;
