import React, { useEffect, useState, useRef } from "react";
import { Template, Exercise, Mesocycle } from "../../database/db";
import {
  fetchAllExercises,
  createMesocycle,
  clearLocalStorageExercises,
} from "../../services/";
import TabNavigation from "../../components/TabNavigation";
import Button from "../../components/common/Button";
import SelectField from "../../components/common/SelectField";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const botRef = useRef<HTMLDivElement>(null); // Add reference to the bottom of the component

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const allExercises = await fetchAllExercises();
        const filteredExercises = allExercises.filter((exercise) =>
          template.days.some((day) => day.muscleGroups.includes(exercise.group))
        );
        setExercises(filteredExercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercisesData();
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

    if (isExerciseComplete) {
      setTimeout(() => {
        botRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom when all inputs for a day are filled
      }, 100);
    }
  }, [selectedExercises, template, mesocycleName, weightUnit]);

  const handleExerciseSelect = (key: string, exercise: Exercise | null) => {
    setSelectedExercises((prev) => ({ ...prev, [key]: exercise }));
  };

  const handleSave = async () => {
    const newMesocycle: Omit<Mesocycle, "id"> = {
      name: mesocycleName,
      templateId: template.id!,
      weeks,
      timesPerWeek: template.timesPerWeek,
      completed: 0,
      isActive: 1,
      workouts: [],
    };
    const mesocycleId = await createMesocycle(newMesocycle, selectedExercises);
    onSave({ id: mesocycleId, ...newMesocycle });
    clearLocalStorageExercises();
    onClose();
    setTimeout(() => {
      navigate("/mesocycles");
    }, 200);
  };

  const getAvailableExercises = (dayIndex: number, muscleGroup: string) => {
    const selectedExerciseIds = Object.keys(selectedExercises)
      .filter((key) => key.startsWith(`${dayIndex}-`))
      .map((key) => selectedExercises[key]?.id)
      .filter((id) => id !== undefined);

    return exercises.filter(
      (exercise) =>
        exercise.group === muscleGroup &&
        !selectedExerciseIds.includes(exercise.id)
    );
  };

  const weekOptions = [
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ];

  const weightUnitOptions = [
    { value: "KG", label: "KG" },
    { value: "LB", label: "LB" },
  ];

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
              const options = getAvailableExercises(dayIndex, muscleGroup).map(
                (exercise) => ({
                  value: exercise.id ?? -1,
                  label: exercise.name,
                  youtubeLink: exercise.youtubeLink,
                })
              );
              return (
                <div key={key} className="mb-2">
                  <SelectField
                    label={muscleGroup}
                    options={options}
                    value={
                      selectedExercises[key]
                        ? {
                            value: selectedExercises[key]!.id!,
                            label: selectedExercises[key]!.name,
                          }
                        : null
                    }
                    onChange={(option) =>
                      handleExerciseSelect(
                        key,
                        exercises.find(
                          (ex) => ex.id === (option as any)?.value
                        ) || null
                      )
                    }
                    isClearable={true}
                    isSearchable={true}
                    zIndex={1000}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {isExerciseSelectionComplete && (
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-lg text-gray-700 font-semibold">
              Mesocycle Name
            </label>
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
            <SelectField
              label="Weeks"
              options={weekOptions}
              value={
                weekOptions.find((option) => option.value === weeks) || null
              }
              onChange={(option) => setWeeks(option?.value || 4)}
              isClearable={false}
              zIndex={1000}
            />
          </div>
          <div className="mb-4">
            <SelectField
              label="Weight Units"
              options={weightUnitOptions}
              value={
                weightUnitOptions.find(
                  (option) => option.value === weightUnit
                ) || null
              }
              onChange={(option) => setWeightUnit(option?.value || "KG")}
              isClearable={false}
              zIndex={1000}
            />
          </div>
        </div>
      )}
      <div className="flex justify-end gap-x-2 mt-4 pb-7" ref={botRef}>
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
