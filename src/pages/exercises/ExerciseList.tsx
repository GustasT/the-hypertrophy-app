import React from "react";
import { Exercise } from "../../database/db";
import Button from "../../components/common/Button";

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
  return (
    <ul className="space-y-4">
      {exercises.map((exercise) => (
        <li key={exercise.id} className="p-4 border rounded">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{exercise.name}</h2>
              <p>
                <strong>Group:</strong> {exercise.group}
              </p>
              <p>
                <strong>Type:</strong> {exercise.type}
              </p>
              {exercise.youtubeLink && (
                <p>
                  <strong>YouTube Link:</strong>{" "}
                  <a
                    href={exercise.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exercise.youtubeLink}
                  </a>
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onEdit(exercise)}>
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={() => onDelete(exercise.id as number)}
              >
                Delete
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExerciseList;
