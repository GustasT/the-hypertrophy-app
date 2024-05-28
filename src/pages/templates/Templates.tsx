import { useState, useEffect } from "react";
import NewTemplateForm from "./NewTemplateForm";
import Dialog from "../../components/Dialog";
import db, { Template, Mesocycle } from "../../database/db";
import TemplateList from "./TemplateList";
import Button from "../../components/common/Button";
import NewMesocycleForm from "../new_mesocycle/NewMesocycleForm";

const Templates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isMesoDialogOpen, setIsMesoDialogOpen] = useState(false);

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

  const handleSave = (template: Template) => {
    if (isEditMode && selectedTemplate) {
      setTemplates((prevTemplates) =>
        prevTemplates.map((t) => (t.id === template.id ? template : t))
      );
    } else {
      setTemplates((prevTemplates) => [...prevTemplates, template]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.table("templates").delete(id);
      setTemplates((prevTemplates) => prevTemplates.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  const openEditDialog = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setSelectedTemplate(null);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  const openMesoDialog = (template: Template) => {
    setSelectedTemplate(template);
    setIsMesoDialogOpen(true);
  };

  const closeMesoDialog = () => {
    setIsMesoDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleMesoSave = async (newMesocycle: Mesocycle) => {
    console.log("New mesocycle saved:", newMesocycle);
    setIsMesoDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-between top-0 bg-white sticky p-4 border-b">
        <h1 className="text-2xl font-bold">Template List</h1>
        <Button onClick={openAddDialog} variant="primary">
          New Template
        </Button>
      </div>
      <div className="p-4">
        <TemplateList
          templates={templates}
          onEdit={openEditDialog}
          onDelete={handleDelete}
          onStartMeso={openMesoDialog} // Add this line
        />
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          title={isEditMode ? "Edit Template" : "Add New Template"}
        >
          <NewTemplateForm
            onSave={handleSave}
            onClose={closeDialog}
            initialData={selectedTemplate || undefined}
          />
        </Dialog>
        <Dialog
          isOpen={isMesoDialogOpen}
          onClose={closeMesoDialog}
          title="Select Exercises"
        >
          {selectedTemplate && (
            <NewMesocycleForm
              template={selectedTemplate}
              onClose={closeMesoDialog}
              onSave={handleMesoSave}
            />
          )}
        </Dialog>
      </div>
    </>
  );
};

export default Templates;
