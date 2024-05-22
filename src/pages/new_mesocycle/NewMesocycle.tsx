import { useState, useEffect } from "react";
import { fetchAllTemplates } from "../../services";
import { Template, Mesocycle } from "../../database/db";
import Dialog from "../../components/Dialog";
import NewMesocycleForm from "./NewMesocycleForm";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";

const NewMesocycle = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const allTemplates = await fetchAllTemplates();
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
    console.log("New mesocycle saved:", newMesocycle);
  };

  return (
    <>
      <PageHeader title="New Mesocycle" buttonText="+" />
      <div className="p-4">
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
    </>
  );
};

export default NewMesocycle;
