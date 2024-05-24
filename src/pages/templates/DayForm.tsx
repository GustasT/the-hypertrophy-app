import React, { useEffect } from "react";
import Select from "react-select";
import { muscleGroups } from "../../config/exerciseOptions";

interface Day {
  name: string;
  muscleGroups: string[];
}

interface DayFormProps {
  day: Day;
  dayNumber: number;
  onChange: (day: Day) => void;
}

const DayForm: React.FC<DayFormProps> = ({ day, dayNumber, onChange }) => {
  useEffect(() => {
    if (day.name !== `Day ${dayNumber}`) {
      onChange({ ...day, name: `Day ${dayNumber}` });
    }
  }, [dayNumber, onChange, day]);

  const handleMuscleGroupChange = (selectedOption: any) => {
    if (selectedOption) {
      const newMuscleGroups = [...day.muscleGroups, selectedOption.value];
      onChange({ ...day, muscleGroups: newMuscleGroups });
    }
  };

  const handleRemoveMuscleGroup = (index: number) => {
    const newMuscleGroups = day.muscleGroups.filter((_, i) => i !== index);
    onChange({ ...day, muscleGroups: newMuscleGroups });
  };

  const muscleGroupOptions = muscleGroups.map((group) => ({
    value: group,
    label: group,
  }));

  return (
    <div className="day-form">
      <div className="mb-4">
        <label className="block text-gray-700">Muscle Groups</label>
        <Select
          options={muscleGroupOptions}
          onChange={handleMuscleGroupChange}
          value={null}
          placeholder="Add muscle group"
          isClearable={false}
          isSearchable={false}
        />
        <div className="mt-2">
          <ol className="list-decimal ml-5">
            {day.muscleGroups.map((group, idx) => (
              <li
                key={idx}
                className="text-gray-700 flex justify-between items-center"
              >
                <span>
                  {idx + 1}. {group}
                </span>
                <button
                  type="button"
                  className="ml-2 text-gray-600 hover:text-gray-700"
                  onClick={() => handleRemoveMuscleGroup(idx)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DayForm;
