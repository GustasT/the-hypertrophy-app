import React, { useState } from "react";
import { Exercise } from "../../database/db";
import Button from "../../components/common/Button";
import { AiOutlineYoutube } from "react-icons/ai";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import Accordion from "../../components/Accordion"; // Adjust the import path as needed
import AnimatedList from "../../components/common/AnimatedList"; // Import the AnimatedList component

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: number) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onEdit,
  onDelete,
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null
  );

  const handleDeleteClick = (exercise: Exercise) => {
    setExerciseToDelete(exercise);
    setIsDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (exerciseToDelete) {
      onDelete(exerciseToDelete.id as number);
      setIsDialogVisible(false);
      setExerciseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogVisible(false);
    setExerciseToDelete(null);
  };

  return (
    <>
      <AnimatedList
        className="space-y-4"
        items={exercises}
        keyExtractor={(exercise) => exercise.id.toString()}
        renderItem={(exercise) => (
          <li key={exercise.id}>
            <Accordion
              id={`exercise-${exercise.id}`} // Pass a unique identifier
              title={
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-semibold">{exercise.name}</h3>
                  {exercise.youtubeLink && (
                    <p>
                      <a
                        href={exercise.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineYoutube size={24} />
                      </a>
                    </p>
                  )}
                </div>
              }
            >
              <div>
                <p>
                  <strong>Group:</strong> {exercise.group}
                </p>
                <p>
                  <strong>Type:</strong> {exercise.type}
                </p>
                <div className="flex space-x-2 mt-2">
                  {!exercise.isDefault && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => onEdit(exercise)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDeleteClick(exercise)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Accordion>
          </li>
        )}
      />
      <ConfirmationDialog
        message={`Delete exercise? `}
        continueText="Delete"
        cancelText="Cancel"
        onContinue={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isVisible={isDialogVisible}
      />
    </>
  );
};

export default ExerciseList;
