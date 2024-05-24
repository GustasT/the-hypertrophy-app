import React, { useEffect } from "react";
import Select from "react-select";
import db, { Template } from "../../database/db";
import DayForm from "./DayForm";
import TabNavigation from "../../components/TabNavigation";
import useTemplateForm from "../../components/hooks/useTemplateForm";
import ErrorList from "../../components/ErrorList";
import Button from "../../components/common/Button";

interface Day {
  name: string;
  muscleGroups: string[];
}

interface NewTemplateFormProps {
  onSave: (template: Template) => void;
  onClose: () => void;
  initialData?: Template | null;
}

const NewTemplateForm: React.FC<NewTemplateFormProps> = ({
  onSave,
  onClose,
  initialData,
}) => {
  const {
    templateName,
    timesPerWeek,
    days,
    activeTab,
    errors,
    setTemplateName,
    setTimesPerWeek,
    setDays,
    setActiveTab,
    handleTimesPerWeekChange,
    handleDayChange,
    validateForm,
  } = useTemplateForm(
    initialData
      ? initialData.days.map((day, index) => ({
          ...day,
          name: `Day ${index + 1}`,
        }))
      : [{ name: "Day 1", muscleGroups: [] }] // Initialize with name property
  );

  useEffect(() => {
    if (initialData) {
      setTemplateName(initialData.name);
      setTimesPerWeek(initialData.timesPerWeek);
      setDays(
        initialData.days.map((day, index) => ({
          ...day,
          name: `Day ${index + 1}`,
        }))
      );
    }
  }, [initialData, setTemplateName, setTimesPerWeek, setDays]);

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
      if (initialData) {
        await db
          .table("templates")
          .update(initialData.id as number, newTemplate);
        newTemplate.id = initialData.id;
      } else {
        const id = await db.table("templates").add(newTemplate);
        newTemplate.id = id as number;
      }
      onSave(newTemplate);
      onClose();
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  const timesPerWeekOptions = [...Array(6)].map((_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

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
        <Select
          options={timesPerWeekOptions}
          value={timesPerWeekOptions.find(
            (option) => option.value === timesPerWeek
          )}
          onChange={(option) => handleTimesPerWeekChange((option as any).value)}
          isClearable={false}
          isSearchable={false}
        />
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
            dayNumber={activeTab + 1} // Pass the day number
          />
        </>
      )}
      <ErrorList errors={errors} />
      <div className="flex justify-end">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default NewTemplateForm;
