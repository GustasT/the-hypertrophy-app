import { useState, useEffect } from "react";
import db, { Template, Mesocycle } from "../../database/db";
import Dialog from "../../components/Dialog";
import NewMesocycleForm from "./NewMesocycleForm";
import Button from "../../components/common/Button";

const NewMesocycle = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mesocycles, setMesocycles] = useState<Mesocycle[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const allTemplates = await db.table("templates").toArray();
        setTemplates(allTemplates);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const openDialog = (template: Template) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleSave = (newMesocycle: Mesocycle) => {
    setMesocycles((prev) => [...prev, newMesocycle]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Select Template for New Mesocycle
      </h1>
      <ul className="space-y-4">
        {templates.map((template) => (
          <li
            key={template.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{template.name}</h2>
              <p>
                <strong>Times per week:</strong> {template.timesPerWeek}
              </p>
            </div>
            {/* <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => openDialog(template)}
            >
              +
            </button> */}
            <Button variant="primary" onClick={() => openDialog(template)}>
              +
            </Button>
          </li>
        ))}
      </ul>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Select Exercises"
      >
        {selectedTemplate && (
          <NewMesocycleForm
            template={selectedTemplate}
            onClose={closeDialog}
            onSave={handleSave}
          />
        )}
      </Dialog>
    </div>
  );
};

export default NewMesocycle;
