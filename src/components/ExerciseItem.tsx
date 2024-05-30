import React, { useState } from "react";
import { ExerciseWithDetails } from "../database/db";
import NumericInput from "../components/common/NumericInput";
import DecimalInput from "../components/common/DecimalInput";
import Button from "../components/common/Button";

interface ExerciseItemProps {
  exercise: ExerciseWithDetails;
  index: number;
  onInputChange: (
    exerciseIndex: number,
    setIndex: number,
    field: string,
    value: number
  ) => void;
  onRemoveSet: (exerciseIndex: number) => void;
  onLogSet: (exerciseIndex: number, setIndex: number) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  index,
  onInputChange,
  onRemoveSet,
  onLogSet,
}) => {
  const [sets, setSets] = useState<{ reps: string; weight: string }[]>([
    { reps: "", weight: "" },
  ]);

  const handleAddSet = () => {
    setSets([...sets, { reps: "", weight: "" }]);
  };

  const handleRemoveLastSet = () => {
    if (sets.length > 1) {
      const updatedSets = sets.slice(0, -1);
      setSets(updatedSets);
      onRemoveSet(index);
    }
  };

  const handleSetInputChange = (
    setIndex: number,
    field: string,
    value: string
  ) => {
    const updatedSets = [...sets];
    updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value };
    setSets(updatedSets);

    // Convert the input value to a number when calling the parent handler
    const numericValue = Number(value.replace(",", "."));
    onInputChange(index, setIndex, field, numericValue);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">{exercise.name}</h2>
      <div className="grid grid-cols-5 gap-4 items-center font-semibold mb-2">
        <div className="col-span-2 text-center">Reps</div>
        <div className="col-span-2 text-center">Weight</div>
      </div>
      {sets.map((set, setIndex) => (
        <div
          key={setIndex}
          className="grid grid-cols-5 gap-4 items-center mb-2"
        >
          <NumericInput
            value={set.reps}
            setIndex={setIndex}
            field="reps"
            onInputChange={handleSetInputChange}
            className="col-span-2"
            placeholder=""
          />
          <DecimalInput
            value={set.weight}
            setIndex={setIndex}
            field="weight"
            onInputChange={handleSetInputChange}
            className="col-span-2"
            placeholder=""
          />
          <Button
            variant="primary"
            onClick={() => onLogSet(index, setIndex)}
            className="col-span-1"
          >
            Log
          </Button>
        </div>
      ))}
      <div className="flex space-x-2 mt-2">
        <Button variant="outline" onClick={handleAddSet}>
          Add
        </Button>
        <Button variant="secondary" onClick={handleRemoveLastSet}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ExerciseItem;
