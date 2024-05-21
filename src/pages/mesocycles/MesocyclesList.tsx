import React from "react";
import { Mesocycle } from "../../database/db";
import Button from "../../components/common/Button";

interface MesocyclesListProps {
  mesocycles: Mesocycle[];
  onDelete: (id: number) => void;
}

const MesocyclesList: React.FC<MesocyclesListProps> = ({
  mesocycles,
  onDelete,
}) => {
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
              <Button
                variant="outline"
                onClick={() =>
                  alert("View functionality is not implemented yet.")
                }
              >
                View
              </Button>
              {/* <button
                className="text-black px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() =>
                  alert("View functionality is not implemented yet.")
                }
              >
                View
              </button> */}
              {/* <button
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                onClick={() => onDelete(mesocycle.id as number)}
              >
                Delete
              </button> */}
              <Button
                variant="secondary"
                onClick={() => onDelete(mesocycle.id as number)}
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
