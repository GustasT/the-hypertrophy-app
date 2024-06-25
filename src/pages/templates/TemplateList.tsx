import React, { useState } from "react";
import { Template } from "../../database/db";
import Button from "../../components/common/Button";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

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
  const [expandedTemplates, setExpandedTemplates] = useState<Set<number>>(
    new Set()
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);

  const toggleTemplate = (id: number) => {
    setExpandedTemplates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
      <ul className="space-y-4">
        {templates.map((template) => (
          <li key={template.id} className="p-4 border rounded">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleTemplate(template.id as number)}
            >
              <div>
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p>
                  <strong>Times per week:</strong> {template.timesPerWeek}
                </p>
              </div>
              <Button variant="outline">
                {expandedTemplates.has(template.id as number) ? "-" : "+"}
              </Button>
            </div>
            {expandedTemplates.has(template.id as number) && (
              <div className="mt-4">
                <ul className="list-disc ml-5">
                  {template.days.map((day, index) => (
                    <li key={index}>
                      <strong>
                        Day {index + 1} ({day.name}):
                      </strong>{" "}
                      {day.muscleGroups.join(", ")}
                    </li>
                  ))}
                </ul>
                <div className="flex space-x-2 mt-4">
                  {!template.isDefault && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => onEdit(template)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDeleteClick(template.id as number)}
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
            )}
          </li>
        ))}
      </ul>
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
