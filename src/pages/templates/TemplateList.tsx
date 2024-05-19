import React, { useState } from "react";
import { Template } from "../../database/db";

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (id: number) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDelete,
}) => {
  const [expandedTemplates, setExpandedTemplates] = useState<Set<number>>(
    new Set()
  );

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

  return (
    <ul className="space-y-4">
      {templates.map((template) => (
        <li key={template.id} className="p-4 border rounded">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleTemplate(template.id as number)}
          >
            <div>
              <h2 className="text-xl font-semibold">{template.name}</h2>
              <p>
                <strong>Times per week:</strong> {template.timesPerWeek}
              </p>
            </div>
            <div>
              {expandedTemplates.has(template.id as number) ? "-" : "+"}
            </div>
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
                <button
                  className="text-black px-2 py-1 border rounded hover:bg-gray-200"
                  onClick={() => onEdit(template)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                  onClick={() => onDelete(template.id as number)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TemplateList;
