import React from "react";
import db, { Template } from "../../database/db";
import DayForm from "./DayForm";
import TabNavigation from "../../components/TabNavigation";
import ErrorList from "../../components/ErrorList";
import useTemplateForm from "../../components/hooks/useTemplateForm";

interface NewTemplateFormProps {
  onSave: (template: Template) => void;
  onClose: () => void;
}

const NewTemplateForm: React.FC<NewTemplateFormProps> = ({
  onSave,
  onClose,
}) => {
  const {
    templateName,
    timesPerWeek,
    days,
    activeTab,
    errors,
    setTemplateName,
    setActiveTab,
    handleTimesPerWeekChange,
    handleDayChange,
    validateForm,
  } = useTemplateForm([{ name: "", muscleGroups: [] }]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newTemplate: Template = {
      name: templateName,
      timesPerWeek: timesPerWeek as number,
      days,
    };

    try {
      const id = await db.table("templates").add(newTemplate);
      newTemplate.id = id as number;
      onSave(newTemplate);
      onClose();
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Template Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Times Per Week</label>
        <select
          className="w-full mt-2 p-2 border rounded"
          value={timesPerWeek || ""}
          onChange={(e) =>
            handleTimesPerWeekChange(parseInt(e.target.value, 10))
          }
          required
        >
          <option value="" disabled>
            Select times per week
          </option>
          {[...Array(6)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      {timesPerWeek && (
        <>
          <TabNavigation
            timesPerWeek={timesPerWeek}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
          <DayForm
            day={days[activeTab]}
            onChange={(day) => handleDayChange(activeTab, day)}
          />
        </>
      )}
      <ErrorList errors={errors} />
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default NewTemplateForm;
