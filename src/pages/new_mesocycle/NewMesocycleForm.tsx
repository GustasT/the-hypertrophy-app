import React, { useEffect, useState } from "react";
import db, { Template, Exercise, Mesocycle } from "../../database/db";
import TabNavigation from "../../components/TabNavigation";
import Button from "../../components/common/Button";

interface NewMesocycleFormProps {
  template: Template;
  initialData?: Mesocycle;
  onClose: () => void;
  onSave: (mesocycle: Mesocycle) => void;
}

const NewMesocycleForm: React.FC<NewMesocycleFormProps> = ({
  template,
  initialData,
  onClose,
  onSave,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<{
    [key: string]: Exercise | null;
  }>({});
  const [activeTab, setActiveTab] = useState(0);
  const [isExerciseSelectionComplete, setIsExerciseSelectionComplete] =
    useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [mesocycleName, setMesocycleName] = useState(initialData?.name || "");
  const [weeks, setWeeks] = useState<number>(initialData?.weeks || 4);
  const [weightUnit, setWeightUnit] = useState("KG");

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

  useEffect(() => {
    const isExerciseComplete = template.days.every((day, dayIndex) =>
      day.muscleGroups.every((muscleGroup, mgIndex) => {
        const key = `${dayIndex}-${mgIndex}-${muscleGroup}`;
        return (
          selectedExercises[key] !== undefined &&
          selectedExercises[key] !== null
        );
      })
    );
    setIsExerciseSelectionComplete(isExerciseComplete);

    const isAdditionalFormComplete = mesocycleName !== "" && weightUnit !== "";
    setIsFormComplete(isExerciseComplete && isAdditionalFormComplete);
  }, [selectedExercises, template, mesocycleName, weightUnit]);

  const handleExerciseSelect = (key: string, exercise: Exercise) => {
    setSelectedExercises((prev) => ({ ...prev, [key]: exercise }));
  };

  const handleSave = async () => {
    const newMesocycle: Omit<Mesocycle, "id"> = {
      name: mesocycleName,
      templateId: template.id!,
      weeks,
      completed: false,
      isActive: false,
    };
    const mesocycleId = await saveMesocycle(newMesocycle);
    onSave({ id: mesocycleId, ...newMesocycle });
  };

  const saveMesocycle = async (
    mesocycle: Omit<Mesocycle, "id">
  ): Promise<number> => {
    try {
      // Create the mesocycle
      const mesocycleId = (await db
        .table("mesocycles")
        .add(mesocycle)) as number;

      // Create the workouts
      for (let week = 1; week <= mesocycle.weeks; week++) {
        for (let day = 1; day <= template.timesPerWeek; day++) {
          await db.table("workouts").add({
            mesocycleId,
            week,
            day,
            completed: false,
          });
        }
      }

      console.log("Mesocycle and workouts saved successfully!");

      // Close the form
      onClose();
      return mesocycleId;
    } catch (error) {
      console.error("Failed to save mesocycle:", error);
      throw error; // Re-throw the error to indicate failure
    }
  };

  return (
    <div>
      <TabNavigation
        timesPerWeek={template.timesPerWeek}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      {template.days.map((day, dayIndex) => {
        if (dayIndex !== activeTab) return null;
        return (
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
        );
      })}
      {isExerciseSelectionComplete && (
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Mesocycle Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded"
              value={mesocycleName}
              onChange={(e) => setMesocycleName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              How many weeks will you train (including deload)
            </label>
            <select
              className="w-full mt-2 p-2 border rounded"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value) as 4 | 5 | 6)}
              required
            >
              {[4, 5, 6].map((week) => (
                <option key={week} value={week}>
                  {week}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Weight Units</label>
            <select
              className="w-full mt-2 p-2 border rounded"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              required
            >
              {["KG", "LB"].map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="flex justify-end gap-x-2 mt-4">
        {/* <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            !isFormComplete && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleSave}
          disabled={!isFormComplete}
        >
          Start New Mesocycle
        </button> */}
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!isFormComplete}
        >
          Start New Meso
        </Button>
      </div>
    </div>
  );
};

export default NewMesocycleForm;
