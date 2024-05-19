import React, { useState } from "react";
import db, { Exercise } from "../../database/db";
import { muscleGroups, exerciseTypes } from "../../config/exerciseOptions";

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
        await db.table("exercises").put(newExercise);
      } else {
        // Add new exercise
        const id = await db.table("exercises").add(newExercise);
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
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default NewExerciseForm;
