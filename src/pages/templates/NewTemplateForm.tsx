import React, { useEffect } from "react";

import db, { Template } from "../../database/db";
import DayForm from "./DayForm";
import TabNavigation from "../../components/TabNavigation";
import useTemplateForm from "../../components/hooks/useTemplateForm";
import ErrorList from "../../components/ErrorList";
import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";

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
    initialData ? initialData.days : [{ name: "", muscleGroups: [] }]
  );

  useEffect(() => {
    if (initialData) {
      setTemplateName(initialData.name);
      setTimesPerWeek(initialData.timesPerWeek);
      setDays(initialData.days);
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
