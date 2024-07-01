// Templates.tsx
import { useState, useEffect } from "react";
import NewTemplateForm from "./NewTemplateForm";
import Dialog from "../../components/Dialog";
import db, { Template, Mesocycle } from "../../database/db";
import TemplateList from "./TemplateList";
import NewMesocycleForm from "../new_mesocycle/NewMesocycleForm";
import { setActiveMesocycleAndWorkout } from "../../utils/mesocycleUtils";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import {
  saveToSessionStorage,
  getFromSessionStorage,
} from "../../utils/sessionStorageUtils";
import StickyDiv from "../../components/common/StickyDiv";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import useScrollToTop from "../../hooks/useScrollToTop";

const Templates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isMesoDialogOpen, setIsMesoDialogOpen] = useState(false);
  const [templateFilter, setTemplateFilter] = useState<
    "all" | "default" | "custom"
  >(() => getFromSessionStorage("templateFilter") || "all");
  const [timesPerWeekFilter, setTimesPerWeekFilter] = useState<string>(
    () => getFromSessionStorage("timesPerWeekFilter") || "all"
  );

  const { topRef, isScrollButtonVisible } = useScrollToTop();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const allTemplates = await db.table("templates").toArray();
        setTemplates(allTemplates);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    };

    const initializeDB = async () => {
      await db.open();
      await fetchTemplates();
    };

    initializeDB();
  }, []);

  useEffect(() => {
    saveToSessionStorage("templateFilter", templateFilter);
  }, [templateFilter]);

  useEffect(() => {
    saveToSessionStorage("timesPerWeekFilter", timesPerWeekFilter);
  }, [timesPerWeekFilter]);

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
    await setActiveMesocycleAndWorkout(newMesocycle.id!);
    setIsMesoDialogOpen(false);
  };

  const sortedTemplates = templates
    .slice()
    .sort((a, b) => a.timesPerWeek - b.timesPerWeek);

  const filteredTemplates = sortedTemplates.filter((template) => {
    if (templateFilter === "default" && !template.isDefault) return false;
    if (templateFilter === "custom" && template.isDefault) return false;
    if (
      timesPerWeekFilter !== "all" &&
      template.timesPerWeek.toString() !== timesPerWeekFilter
    )
      return false;
    return true;
  });

  const uniqueTimesPerWeek = Array.from(
    new Set(templates.map((template) => template.timesPerWeek.toString()))
  ).sort((a, b) => Number(a) - Number(b));

  return (
    <>
      <div ref={topRef}></div>
      <PageHeader
        title="Template List"
        buttonText="New Template"
        buttonAction={openAddDialog}
      />
      <StickyDiv>
        <div className="mb-4 mt-4 flex space-x-2">
          <Button
            onClick={() => setTemplateFilter("all")}
            variant={templateFilter === "all" ? "primary" : "outline"}
            size="sm"
          >
            All Templates
          </Button>
          <Button
            onClick={() => setTemplateFilter("default")}
            variant={templateFilter === "default" ? "primary" : "outline"}
            size="sm"
          >
            Default
          </Button>
          <Button
            onClick={() => setTemplateFilter("custom")}
            variant={templateFilter === "custom" ? "primary" : "outline"}
            size="sm"
          >
            Custom
          </Button>
        </div>

        <div className="mb-4 flex space-x-2">
          <label htmlFor="timesPerWeekFilter" className="mr-2">
            Times Per Week:
          </label>
          <select
            id="timesPerWeekFilter"
            value={timesPerWeekFilter}
            onChange={(e) => setTimesPerWeekFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            {uniqueTimesPerWeek.map((times) => (
              <option key={times} value={times}>
                {times}
              </option>
            ))}
          </select>
        </div>
      </StickyDiv>
      <div className="p-4">
        <TemplateList
          templates={filteredTemplates}
          onEdit={openEditDialog}
          onDelete={handleDelete}
          onStartMeso={openMesoDialog}
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
        <ScrollToTopButton topRef={topRef} isVisible={isScrollButtonVisible} />
      </div>
    </>
  );
};

export default Templates;
