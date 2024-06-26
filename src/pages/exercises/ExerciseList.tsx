import React, { useState } from "react";
import { Exercise } from "../../database/db";
import Button from "../../components/common/Button";
import { AiOutlineYoutube } from "react-icons/ai";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import Accordion from "../../components/Accordion"; // Adjust the import path as needed

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
      <ul className="space-y-4">
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Accordion
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
                <strong>Type:</strong> {exercise.type}
                {/* {exercise.youtubeLink && (
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
                )} */}
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
        ))}
      </ul>
      <ConfirmationDialog
        title="Confirm Deletion"
        message={`Are you sure you want to delete the exercise "${exerciseToDelete?.name}"?`}
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
