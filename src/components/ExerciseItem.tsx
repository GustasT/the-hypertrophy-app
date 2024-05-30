import React, { useState, useEffect } from "react";
import { ExerciseWithDetails } from "../database/db";
import NumericInput from "../components/common/NumericInput";
import DecimalInput from "../components/common/DecimalInput";
import Button from "../components/common/Button";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";

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
  const [sets, setSets] = useState<
    { reps: string; weight: string; logged: boolean }[]
  >([{ reps: "", weight: "", logged: false }]);
  const [isValid, setIsValid] = useState<boolean[]>([false]);

  useEffect(() => {
    setIsValid(sets.map((set) => set.reps !== "" && set.weight !== ""));
  }, [sets]);

  useEffect(() => {
    const savedSets = getFromLocalStorage(`exercise-${exercise.id}-sets`);
    if (savedSets) {
      setSets(savedSets);
    }
  }, [exercise.id]);

  const handleAddSet = () => {
    const updatedSets = [...sets, { reps: "", weight: "", logged: false }];
    setSets(updatedSets);
    setIsValid([...isValid, false]);
    saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);
  };

  const handleRemoveLastSet = () => {
    if (sets.length > 1) {
      const updatedSets = sets.slice(0, -1);
      setSets(updatedSets);
      setIsValid(isValid.slice(0, -1));
      onRemoveSet(index);
      saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);
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

    // Validate the input values
    const reps = field === "reps" ? value : updatedSets[setIndex].reps;
    const weight = field === "weight" ? value : updatedSets[setIndex].weight;
    const updatedValidations = [...isValid];
    updatedValidations[setIndex] = reps !== "" && weight !== "";
    setIsValid(updatedValidations);

    // Convert the input value to a number when calling the parent handler
    const numericValue = Number(value.replace(",", "."));
    onInputChange(index, setIndex, field, numericValue);

    // Save the updated sets to localStorage
    saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);
  };

  const handleLogSetToggle = (setIndex: number) => {
    const updatedSets = [...sets];
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      logged: !updatedSets[setIndex].logged,
    };
    setSets(updatedSets);
    saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);
  };

  const inputClassNames = (logged: boolean) =>
    `col-span-2 ${logged ? "bg-gray-200" : ""}`;

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
            className={inputClassNames(set.logged)}
            placeholder=""
            disabled={set.logged}
          />
          <DecimalInput
            value={set.weight}
            setIndex={setIndex}
            field="weight"
            onInputChange={handleSetInputChange}
            className={inputClassNames(set.logged)}
            placeholder=""
            disabled={set.logged}
          />
          <Button
            variant="primary"
            onClick={() => handleLogSetToggle(setIndex)}
            className="col-span-1"
            disabled={!isValid[setIndex]}
          >
            {set.logged ? "Unlog" : "Log"}
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
