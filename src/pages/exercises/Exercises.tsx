import { ExerciseData } from "./ExerciseData";

type Props = {};

const Exercises = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Exercise List</h1>
        <button
          type="button"
          className="bg-blue-500 text-white pl-4 pr-4 py-2 hover:bg-blue-600"
        >
          + New
        </button>
      </div>
      <ul className="space-y-4">
        {ExerciseData.map((exercise, index) => (
          <li key={index} className="p-4 border rounded">
            <div>
              <h2 className="text-xl font-semibold">{exercise.title}</h2>
              <p>
                <strong>Group:</strong> {exercise.group}
              </p>
              <p>
                <strong>Type:</strong> {exercise.type}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;
