import React, { useState, useEffect } from "react";
import { ExerciseWithDetails } from "../database/db";
import NumericInput from "../components/common/NumericInput";
import DecimalInput from "../components/common/DecimalInput";
import Button from "../components/common/Button";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";
import { updateWorkoutSets } from "../services";

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
  workoutId: number;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  index,
  onInputChange,
  onRemoveSet,
  workoutId,
}) => {
  const initialSets = exercise.sets?.length
    ? exercise.sets.map((set) => ({
        reps: set.reps.toString(),
        weight: set.weight.toString(),
        logged: set.reps !== 0 && set.weight !== 0,
      }))
    : [{ reps: "", weight: "", logged: false }];

  const [sets, setSets] =
    useState<{ reps: string; weight: string; logged: boolean }[]>(initialSets);
  const [isValid, setIsValid] = useState<boolean[]>(
    sets.map(
      (set) =>
        set.reps !== "" &&
        set.reps !== "0" &&
        set.weight !== "" &&
        set.weight !== "0"
    )
  );
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(
    sets.length === 0 || !sets[sets.length - 1].logged
  );

  useEffect(() => {
    setIsValid(
      sets.map(
        (set) =>
          set.reps !== "" &&
          set.reps !== "0" &&
          set.weight !== "" &&
          set.weight !== "0"
      )
    );
  }, [sets]);

  useEffect(() => {
    const savedSets = getFromLocalStorage(`exercise-${exercise.id}-sets`);
    if (savedSets) {
      setSets(savedSets);
    } else {
      if (sets.length === 0) {
        setSets([{ reps: "", weight: "", logged: false }]);
      }
    }
  }, [exercise.id]);

  useEffect(() => {
    setIsAddButtonDisabled(sets.length === 0 || !sets[sets.length - 1].logged);
  }, [sets]);

  const handleAddSet = () => {
    const updatedSets = [...sets, { reps: "", weight: "", logged: false }];
    setSets(updatedSets);
    setIsValid([...isValid, false]);
    saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);
  };

  const handleRemoveLastSet = async () => {
    if (sets.length > 1) {
      const updatedSets = sets.slice(0, -1);
      setSets(updatedSets);
      setIsValid(isValid.slice(0, -1));
      onRemoveSet(index);
      saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);

      await updateWorkoutSets(
        workoutId,
        index,
        updatedSets.map((set) => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
        }))
      );
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

    const updatedValidations = [...isValid];
    updatedValidations[setIndex] =
      updatedSets[setIndex].reps !== "" &&
      updatedSets[setIndex].reps !== "0" &&
      updatedSets[setIndex].weight !== "" &&
      updatedSets[setIndex].weight !== "0";
    setIsValid(updatedValidations);

    const numericValue = Number(value.replace(",", "."));
    onInputChange(index, setIndex, field, numericValue);

    saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);
  };

  const handleLogSetToggle = async (setIndex: number) => {
    const updatedSets = [...sets];
    const currentSet = updatedSets[setIndex];
    updatedSets[setIndex] = {
      ...currentSet,
      logged: !currentSet.logged,
    };
    setSets(updatedSets);
    saveToLocalStorage(`exercise-${exercise.id}-sets`, updatedSets);

    if (!currentSet.logged) {
      await updateWorkoutSets(
        workoutId,
        index,
        updatedSets.map((set) => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
        }))
      );
    }
  };

  const inputClassNames = (logged: boolean) =>
    `col-span-2 ${logged ? "bg-gray-200" : ""}`;

  const isRemoveButtonDisabled =
    sets.length === 1 || sets[sets.length - 1]?.logged;

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
            value={set.reps === "0" ? "" : set.reps}
            setIndex={setIndex}
            field="reps"
            onInputChange={handleSetInputChange}
            className={inputClassNames(set.logged)}
            placeholder=""
            disabled={set.logged}
          />
          <DecimalInput
            value={set.weight === "0" ? "" : set.weight}
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
        <Button
          variant="outline"
          onClick={handleAddSet}
          disabled={isAddButtonDisabled}
        >
          Add
        </Button>
        <Button
          variant="secondary"
          onClick={handleRemoveLastSet}
          disabled={isRemoveButtonDisabled}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ExerciseItem;
