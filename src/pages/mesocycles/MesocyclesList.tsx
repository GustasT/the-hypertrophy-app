import React from "react";
import { Mesocycle } from "../../database/db";
import Button from "../../components/common/Button";

interface MesocyclesListProps {
  mesocycles: Mesocycle[];
  onDelete: (id: number) => void;
  onSetActive: (id: number) => void;
}

const MesocyclesList: React.FC<MesocyclesListProps> = ({
  mesocycles,
  onDelete,
  onSetActive,
}) => {
  const handleDelete = async (id: number) => {
    onDelete(id);
  };

  const handleSetActive = async (id: number) => {
    onSetActive(id);
  };

  return (
    <ul className="space-y-4">
      {mesocycles.map((mesocycle) => (
        <li key={mesocycle.id} className="p-4 border rounded">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{mesocycle.name}</h2>
              <p>
                <strong>Weeks:</strong> {mesocycle.weeks}
              </p>
              <p>
                <strong>Template ID:</strong> {mesocycle.templateId}
              </p>
            </div>
            <div className="flex space-x-2">
              {mesocycle.completed ? (
                <span className="text-gray-500">Completed</span>
              ) : mesocycle.isActive ? (
                <span className="text-green-500 font-bold">Active</span>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleSetActive(mesocycle.id as number)}
                >
                  Make Active
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => handleDelete(mesocycle.id as number)}
              >
                Delete
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MesocyclesList;
