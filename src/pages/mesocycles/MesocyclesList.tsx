import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mesocycle, Template } from "../../database/db";
import Button from "../../components/common/Button";
import db from "../../database/db";

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
  const [templateNames, setTemplateNames] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const fetchTemplateNames = async () => {
      try {
        const templates = await db.table("templates").toArray();
        const names = templates.reduce(
          (acc: { [key: number]: string }, template: Template) => {
            if (template.id) {
              acc[template.id] = template.name;
            }
            return acc;
          },
          {}
        );
        setTemplateNames(names);
      } catch (error) {
        console.error("Failed to fetch template names:", error);
      }
    };

    fetchTemplateNames();
  }, []);

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
                <strong>Times/week</strong> {mesocycle.timesPerWeek}
              </p>
              <p>
                <strong>Template:</strong>{" "}
                {templateNames[mesocycle.templateId] || mesocycle.templateId}
              </p>
            </div>
            <div className="flex space-x-2">
              {mesocycle.completed ? (
                <span className="text-gray-500">Completed</span>
              ) : mesocycle.isActive ? (
                <div className="bg-green-400 text-white px-2 py-2 rounded-full">
                  Active
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleSetActive(mesocycle.id as number)}
                >
                  Make Active
                </Button>
              )}
              <Link to={`/mesocycles/${mesocycle.id}`}>
                <Button variant="primary">View</Button>
              </Link>

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
