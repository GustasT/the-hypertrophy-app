import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mesocycle, Template } from "../../database/db";
import Button from "../../components/common/Button";
import db from "../../database/db";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import Accordion from "../../components/Accordion";
import { Flipper, Flipped } from "react-flip-toolkit";
import AnimatedList from "../../components/common/AnimatedList"; // Import the AnimatedList component

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
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [mesocycleToDelete, setMesocycleToDelete] = useState<number | null>(
    null
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

  const handleSetActive = async (id: number) => {
    onSetActive(id);
  };

  const handleDeleteClick = (id: number) => {
    setMesocycleToDelete(id);
    setIsDialogVisible(true);
  };

  const handleContinue = () => {
    if (mesocycleToDelete !== null) {
      onDelete(mesocycleToDelete);
      setMesocycleToDelete(null);
    }
    setIsDialogVisible(false);
  };

  const handleCancel = () => {
    setMesocycleToDelete(null);
    setIsDialogVisible(false);
  };

  return (
    <>
      <Flipper flipKey={mesocycles.map((mesocycle) => mesocycle.id).join("-")}>
        <AnimatedList
          className="space-y-4"
          items={mesocycles}
          keyExtractor={(mesocycle) => mesocycle.id.toString()}
          renderItem={(mesocycle) => (
            <Flipped key={mesocycle.id} flipId={mesocycle.id}>
              <li>
                <Accordion
                  title={
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <h3 className="font-semibold">{mesocycle.name}</h3>
                        <p>
                          {templateNames[mesocycle.templateId] ||
                            mesocycle.templateId}
                        </p>
                      </div>
                      <div className="flex space-x-2 z-10">
                        {mesocycle.completed ? (
                          <span className="text-green-400 px-2 py-1">
                            Completed
                          </span>
                        ) : mesocycle.isActive ? (
                          <div className="bg-green-400 text-white px-2 py-1 text-sm rounded">
                            Active
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleSetActive(mesocycle.id as number)
                            }
                            size="sm"
                          >
                            Make Active
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                  isExpanded={false}
                >
                  <div className="text-sm text-gray-600">
                    {mesocycle.weeks} <span>WEEKS</span> -{" "}
                    {mesocycle.timesPerWeek} <span>DAYS/WEEK</span>
                    <div className="flex space-x-2 mt-2">
                      <Link to={`/mesocycles/${mesocycle.id}`}>
                        <Button variant="outline">View</Button>
                      </Link>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleDeleteClick(mesocycle.id as number)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Accordion>
              </li>
            </Flipped>
          )}
        />
      </Flipper>
      <ConfirmationDialog
        message="Delete mesocycle?"
        continueText="Continue"
        cancelText="Cancel"
        onContinue={handleContinue}
        onCancel={handleCancel}
        isVisible={isDialogVisible}
      />
    </>
  );
};

export default MesocyclesList;
