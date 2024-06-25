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

  return {
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
  };
};

export default useTemplateForm;
