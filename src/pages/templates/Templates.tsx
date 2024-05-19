import { useState, useEffect } from "react";
import NewTemplateForm from "./NewTemplateForm";
import Dialog from "../../components/Dialog";
import db, { Template } from "../../database/db";
import TemplateList from "./TemplateList";
import DeleteDatabaseButton from "../../utils/DeleteDatabaseButton";

const Templates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [templates, setTemplates] = useState<Template[]>([]);

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

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Template List</h1>
        <button
          type="button"
          className="bg-blue-600 text-white pl-4 pr-4 py-2 rounded hover:bg-blue-700"
          onClick={openAddDialog}
        >
          + New
        </button>
        {/* <DeleteDatabaseButton /> */}
      </div>
      <TemplateList
        templates={templates}
        onEdit={openEditDialog}
        onDelete={handleDelete}
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
    </div>
  );
};

export default Templates;
