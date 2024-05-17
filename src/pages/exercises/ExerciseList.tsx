import React from "react";
import { Exercise } from "../../database/db";

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <ul className="space-y-4">
      {exercises.map((exercise) => (
        <li key={exercise.id} className="p-4 border rounded">
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
        </li>
      ))}
    </ul>
  );
};

export default ExerciseList;
