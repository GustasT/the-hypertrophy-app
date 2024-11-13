import React, { useEffect, useState } from "react";
import db, { Template } from "../../database/db";
import DayForm from "./DayForm";
import TabNavigation from "../../components/TabNavigation";
import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import useTemplateForm from "../../hooks/useTemplateForm";

interface NewTemplateFormProps {
  onSave: (template: Template) => void;
  onClose: () => void;
  initialData?: Template | null;
}

const validateForm = (templateName: string, days: any[]): boolean => {
  if (!templateName) return false;
  for (const day of days) {
    if (!day.name || day.muscleGroups.length === 0) {
      return false;
    }
  }
  return true;
};

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
    setTemplateName,
    setTimesPerWeek,
    setDays,
    setActiveTab,
    handleTimesPerWeekChange,
    handleDayChange,
  } = useTemplateForm(
    initialData ? initialData.days : [{ name: "", muscleGroups: [] }]
  );

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTemplateName(initialData.name);
      setTimesPerWeek(initialData.timesPerWeek);
      setDays(initialData.days);
    }
  }, [initialData, setTemplateName, setTimesPerWeek, setDays]);

  useEffect(() => {
    setIsFormValid(validateForm(templateName, days));
  }, [templateName, timesPerWeek, days]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    const newTemplateData = {
      name: templateName,
      timesPerWeek: timesPerWeek as number,
      days,
      isDefault: false,
    };

    try {
      let newTemplate: Template;

      if (initialData) {
        await db
          .table("templates")
          .update(initialData.id as number, newTemplateData);
        newTemplate = { ...newTemplateData, id: initialData.id };
      } else {
        const id = await db.table("templates").add(newTemplateData);
        newTemplate = { ...newTemplateData, id: id as number };
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
      <InputField
        type="text"
        label="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <SelectField
        options={timesPerWeekOptions}
        value={
          timesPerWeekOptions.find((option) => option.value === timesPerWeek) ||
          null
        }
        label="Times Per Week"
        onChange={(option) => handleTimesPerWeekChange((option as any).value)}
      />

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
      <div className="flex justify-end pb-4">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default NewTemplateForm;
