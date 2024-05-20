import { useState, useEffect } from "react";
import db, { Mesocycle } from "../../database/db";
import MesocyclesList from "./MesocyclesList";
import Message from "../../components/Message";

const Mesocycles = () => {
  const [message, setMessage] = useState("");
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
      setMessage("Mesocycle deleted successfully!");
    } catch (error) {
      console.error("Failed to delete mesocycle:", error);
      setMessage("Failed to delete mesocycle.");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Mesocycles</h1>
      </div>
      {message && <Message message={message} />}
      <MesocyclesList mesocycles={mesocycles} onDelete={handleDelete} />
    </div>
  );
};

export default Mesocycles;
