import React, { useState, useEffect } from "react";
import { Exercise } from "../../database/db";
import { addExercise, updateExercise } from "../../services/dbService";
import { muscleGroups, exerciseTypes } from "../../config/exerciseOptions";
import Button from "../../components/common/Button";

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
      <div className="mb-4">
        <label className="block text-gray-700">Muscle Group</label>
        <select
          className="w-full mt-2 p-2 border rounded"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          required
        >
          <option value="" disabled>
            Select muscle group
          </option>
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Exercise Type</label>
        <select
          className="w-full mt-2 p-2 border rounded"
          value={exerciseType}
          onChange={(e) => setExerciseType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select exercise type
          </option>
          {exerciseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
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
