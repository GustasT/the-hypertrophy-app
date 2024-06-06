import { useState } from "react";

interface Day {
  name: string;
  muscleGroups: string[];
}

const useTemplateForm = (initialDays: Day[]) => {
  const [templateName, setTemplateName] = useState("");
  const [timesPerWeek, setTimesPerWeek] = useState<number | null>(null);
  const [days, setDays] = useState<Day[]>(initialDays);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const handleTimesPerWeekChange = (value: number) => {
    setTimesPerWeek(value);
    setDays(new Array(value).fill({ name: "", muscleGroups: [] }));
    setActiveTab(0); // Reset active tab
  };

  const handleDayChange = (index: number, day: Day) => {
    const newDays = [...days];
    newDays[index] = day;
    setDays(newDays);
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!templateName) {
      newErrors.push("Template name is required.");
    }
    days.forEach((day, index) => {
      if (!day.name) {
        newErrors.push(`Day ${index + 1} name is required.`);
      }
      if (day.muscleGroups.length === 0) {
        newErrors.push(
          `At least one muscle group is required for Day ${index + 1}.`
        );
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return {
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
  };
};

export default useTemplateForm;
