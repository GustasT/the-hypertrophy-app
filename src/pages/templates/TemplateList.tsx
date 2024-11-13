import React, { useState } from "react";
import { Template } from "../../database/db";
import Button from "../../components/common/Button";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import Accordion from "../../components/Accordion";
import AnimatedList from "../../components/common/AnimatedList"; // Import the AnimatedList component

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (id: number) => void;
  onStartMeso: (template: Template) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDelete,
  onStartMeso,
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setTemplateToDelete(id);
    setIsDialogVisible(true);
  };

  const handleContinue = () => {
    if (templateToDelete !== null) {
      onDelete(templateToDelete);
      setTemplateToDelete(null);
    }
    setIsDialogVisible(false);
  };

  const handleCancel = () => {
    setTemplateToDelete(null);
    setIsDialogVisible(false);
  };

  return (
    <>
      <AnimatedList
        className="space-y-4"
        items={templates}
        keyExtractor={(template) => template.id.toString()}
        renderItem={(template) => (
          <li key={template.id}>
            <Accordion
              title={
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <span className="text-gray-600 text-sm">
                    {template.timesPerWeek}/WEEK:
                  </span>
                </div>
              }
            >
              <div>
                <ul className="list-none ml-5 grid grid-cols-3 gap-4">
                  {template.days.map((day, index) => (
                    <li key={index} className="flex flex-col space-y-1">
                      <div className="font-bold">Day {index + 1}</div>
                      <div className="font-semibold">({day.name})</div>
                      <div>
                        {day.muscleGroups.map((muscleGroup, idx) => (
                          <div key={idx}>{muscleGroup}</div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex space-x-2 mt-4">
                  {!template.isDefault && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => onEdit(template)}
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDeleteClick(template.id as number)}
                        size="sm"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => onStartMeso(template)}
                  >
                    New Meso
                  </Button>
                </div>
              </div>
            </Accordion>
          </li>
        )}
      />
      <ConfirmationDialog
        message="Delete template?"
        continueText="Continue"
        cancelText="Cancel"
        onContinue={handleContinue}
        onCancel={handleCancel}
        isVisible={isDialogVisible}
      />
    </>
  );
};

export default TemplateList;
