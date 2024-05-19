import React from "react";
import { muscleGroups } from "../../config/exerciseOptions";

interface Day {
  name: string;
  muscleGroups: string[];
}

interface DayFormProps {
  day: Day;
  onChange: (day: Day) => void;
}

const DayForm: React.FC<DayFormProps> = ({ day, onChange }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...day, name: e.target.value });
  };

  const handleMuscleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMuscleGroups = [...day.muscleGroups, e.target.value];
    onChange({ ...day, muscleGroups: newMuscleGroups });
  };

  const handleRemoveMuscleGroup = (index: number) => {
    const newMuscleGroups = day.muscleGroups.filter((_, i) => i !== index);
    onChange({ ...day, muscleGroups: newMuscleGroups });
  };

  return (
    <div className="day-form">
      <div className="mb-4">
        <label className="block text-gray-700">Day Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={day.name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Muscle Groups</label>
        <select
          className="w-full mt-2 p-2 border rounded"
          onChange={handleMuscleGroupChange}
          value=""
        >
          <option value="" disabled>
            Add muscle group
          </option>
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
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
                  className="ml-2 text-red-500 hover:text-red-700"
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
