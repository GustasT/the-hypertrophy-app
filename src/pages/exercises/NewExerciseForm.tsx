import React, { useState, useEffect } from "react";
import { Exercise } from "../../database/db";
import { addExercise, updateExercise } from "../../services";
import { muscleGroups, exerciseTypes } from "../../config/exerciseOptions";
import Button from "../../components/common/Button";
import SelectField from "../../components/common/SelectField"; // Make sure to adjust the import path if necessary

interface NewExerciseFormProps {
  onSave: (exercise: Exercise) => void;
  onClose: () => void;
  initialData?: Exercise; // Optional prop for initial data
}

const NewExerciseForm: React.FC<NewExerciseFormProps> = ({
  onSave,
  onClose,
  initialData,
}) => {
  const [exerciseName, setExerciseName] = useState(initialData?.name || "");
  const [muscleGroup, setMuscleGroup] = useState(initialData?.group || "");
  const [exerciseType, setExerciseType] = useState(initialData?.type || "");
  const [youtubeLink, setYoutubeLink] = useState(
    initialData?.youtubeLink || ""
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    setIsFormValid(
      exerciseName !== "" && muscleGroup !== "" && exerciseType !== ""
    );
  }, [exerciseName, muscleGroup, exerciseType]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newExercise: Exercise = {
      id: initialData?.id as number, // Cast to number
      name: exerciseName,
      group: muscleGroup,
      type: exerciseType,
      youtubeLink,
    };

    try {
      if (initialData) {
        // Update existing exercise
        await updateExercise(newExercise);
      } else {
        // Add new exercise
        const id = await addExercise(newExercise);
        newExercise.id = id as number; // Cast to number
      }

      onSave(newExercise);
      onClose();
    } catch (error) {
      console.error("Failed to save exercise:", error);
    }
  };

  const muscleGroupOptions = muscleGroups.map((group) => ({
    value: group,
    label: group,
  }));

  const exerciseTypeOptions = exerciseTypes.map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Exercise Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
      </div>
      <SelectField
        label="Muscle Group"
        options={muscleGroupOptions}
        value={
          muscleGroupOptions.find((option) => option.value === muscleGroup) ||
          null
        }
        onChange={(option) => setMuscleGroup((option as any).value)}
        isClearable={false}
        isSearchable={false}
        zIndex={1000} // Adjust zIndex if needed
      />
      <SelectField
        label="Exercise Type"
        options={exerciseTypeOptions}
        value={
          exerciseTypeOptions.find((option) => option.value === exerciseType) ||
          null
        }
        onChange={(option) => setExerciseType((option as any).value)}
        isClearable={false}
        isSearchable={false}
        zIndex={1000} // Adjust zIndex if needed
      />
      <div className="mb-4">
        <label className="block text-gray-700">YouTube Link (optional)</label>
        <input
          type="url"
          className="w-full mt-2 p-2 border rounded"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!isFormValid} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default NewExerciseForm;
