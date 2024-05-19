import { useState } from "react";
import NewTemplateForm from "./NewTemplateForm";
import Dialog from "../../components/Dialog";

const Templates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveTemplate = (template: any) => {
    console.log("Template saved:", template);
    // Add logic to save the template to IndexedDB here
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Template List</h1>
        <button
          type="button"
          className="bg-blue-600 text-white pl-4 pr-4 py-2 rounded hover:bg-blue-700"
          onClick={handleOpenDialog}
        >
          + New
        </button>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="New Template"
      >
        <NewTemplateForm
          onSave={handleSaveTemplate}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </div>
  );
};

export default Templates;
