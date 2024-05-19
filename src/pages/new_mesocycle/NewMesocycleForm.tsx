import React, { useEffect, useState } from "react";
import db, { Template, Exercise } from "../../database/db";

interface NewMesocycleFormProps {
  template: Template;
  onClose: () => void;
}

const NewMesocycleForm: React.FC<NewMesocycleFormProps> = ({
  template,
  onClose,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<{
    [key: string]: Exercise | null;
  }>({});

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const allExercises = await db.table("exercises").toArray();
        const filteredExercises = allExercises.filter((exercise) =>
          template.days.some((day) => day.muscleGroups.includes(exercise.group))
        );
        setExercises(filteredExercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises();
  }, [template]);

  const handleExerciseSelect = (key: string, exercise: Exercise) => {
    setSelectedExercises((prev) => ({ ...prev, [key]: exercise }));
  };

  return (
    <div>
      {template.days.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-4">
          <h3 className="text-lg font-semibold">{day.name}</h3>
          {day.muscleGroups.map((muscleGroup, mgIndex) => {
            const key = `${dayIndex}-${mgIndex}-${muscleGroup}`;
            return (
              <div key={key} className="mb-2">
                <label className="block text-gray-700 mb-1">
                  {muscleGroup}
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedExercises[key]?.id || ""}
                  onChange={(e) =>
                    handleExerciseSelect(
                      key,
                      exercises.find(
                        (ex) => ex.id === Number(e.target.value)
                      ) as Exercise
                    )
                  }
                >
                  <option value="" disabled>
                    Select exercise
                  </option>
                  {exercises
                    .filter((exercise) => exercise.group === muscleGroup)
                    .map((exercise) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </option>
                    ))}
                </select>
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => console.log("Selected exercises:", selectedExercises)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NewMesocycleForm;
