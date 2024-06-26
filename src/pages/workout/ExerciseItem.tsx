import React, { useState, useEffect } from "react";
import { ExerciseWithDetails } from "../../database/db";
import NumericInput from "../../components/common/NumericInput";
import DecimalInput from "../../components/common/DecimalInput";
import Button from "../../components/common/Button";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorageUtils";
import { updateWorkoutSets } from "../../services";

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
  checkUnloggedSets: () => void;
  historicalSets?: { reps: number; weight: number }[];
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  index,
  onInputChange,
  onRemoveSet,
  workoutId,
  checkUnloggedSets,
  historicalSets,
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
    const savedWorkoutSets = getFromLocalStorage(`workout-${workoutId}-sets`);
    if (savedWorkoutSets && savedWorkoutSets[exercise.id!]) {
      setSets(
        savedWorkoutSets[exercise.id!].map((set: any) => ({
          reps: set.reps.toString(),
          weight: set.weight.toString(),
          logged: set.logged ?? (set.reps !== 0 && set.weight !== 0),
        }))
      );
    } else {
      if (sets.length === 0) {
        setSets([{ reps: "", weight: "", logged: false }]);
      }
    }
  }, [exercise.id, workoutId]);

  useEffect(() => {
    setIsAddButtonDisabled(sets.length === 0 || !sets[sets.length - 1].logged);
  }, [sets]);

  const saveSetsToLocalStorage = (updatedSets: any) => {
    const currentWorkoutSets =
      getFromLocalStorage(`workout-${workoutId}-sets`) || {};
    currentWorkoutSets[exercise.id!] = updatedSets;
    saveToLocalStorage(`workout-${workoutId}-sets`, currentWorkoutSets);
  };

  const handleAddSet = () => {
    const updatedSets = [...sets, { reps: "", weight: "", logged: false }];
    setSets(updatedSets);
    setIsValid([...isValid, false]);
    saveSetsToLocalStorage(updatedSets);
    checkUnloggedSets();
  };

  const handleRemoveLastSet = async () => {
    if (sets.length > 1) {
      const updatedSets = sets.slice(0, -1);
      setSets(updatedSets);
      setIsValid(isValid.slice(0, -1));
      onRemoveSet(index);
      saveSetsToLocalStorage(updatedSets);
      checkUnloggedSets();

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

    saveSetsToLocalStorage(updatedSets);
  };

  const handleLogSetToggle = async (setIndex: number) => {
    const updatedSets = [...sets];
    const currentSet = updatedSets[setIndex];
    updatedSets[setIndex] = {
      ...currentSet,
      logged: !currentSet.logged,
    };
    setSets(updatedSets);
    saveSetsToLocalStorage(updatedSets);

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
    checkUnloggedSets();
  };

  const inputClassNames = (logged: boolean) =>
    `col-span-2 ${logged ? "bg-gray-200" : ""}`;

  const isRemoveButtonDisabled =
    sets.length === 1 || sets[sets.length - 1]?.logged;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{exercise.name}</h3>
        {exercise.youtubeLink && (
          <a
            href={exercise.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-700"
          >
            <AiOutlineYoutube size={24} />
          </a>
        )}
      </div>
      <p className="text-sm text-gray-500">{exercise.group}</p>
      <div className="grid grid-cols-5 gap-2 items-center font-medium mb-2 mt-2">
        <div className="col-span-2 text-center">Reps</div>
        <div className="col-span-2 text-center">Weight</div>
      </div>
      {sets.map((set, setIndex) => (
        <div
          key={setIndex}
          className="grid grid-cols-5 gap-2 items-center mb-2"
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
          // size="sm"
        >
          +
        </Button>
        <Button
          variant="secondary"
          onClick={handleRemoveLastSet}
          disabled={isRemoveButtonDisabled}
          // size="sm"
        >
          -
        </Button>
      </div>
      {/* Display historical sets separately */}
      {historicalSets && historicalSets.length > 0 && (
        <div className="mt-4 text-gray-600">
          <span className="text-sm font-semibold">Previous Workout:</span>
          {historicalSets.map((set, setIndex) => (
            <div key={setIndex} className="text-center">
              {set.reps} x {set.weight}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseItem;
