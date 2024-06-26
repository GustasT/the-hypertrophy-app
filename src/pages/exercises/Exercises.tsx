import { useState, useEffect } from "react";
import { fetchAllExercises, deleteExercise } from "../../services";
import { Exercise } from "../../database/db";
import NewExerciseForm from "./NewExerciseForm";
import ExerciseList from "./ExerciseList";
import Dialog from "../../components/Dialog";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import {
  saveToSessionStorage,
  getFromSessionStorage,
} from "../../utils/sessionStorageUtils"; // Adjust the import path as needed

const Exercises = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseFilter, setExerciseFilter] = useState<
    "all" | "default" | "custom"
  >(getFromSessionStorage("exerciseFilter") || "all"); // Load from session storage
  const [groupFilter, setGroupFilter] = useState<string>(
    getFromSessionStorage("groupFilter") || "all"
  ); // Load from session storage
  const [typeFilter, setTypeFilter] = useState<string>(
    getFromSessionStorage("typeFilter") || "all"
  ); // Load from session storage

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const allExercises = await fetchAllExercises();
        setExercises(allExercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercisesData();
  }, []);

  useEffect(() => {
    saveToSessionStorage("exerciseFilter", exerciseFilter);
  }, [exerciseFilter]);

  useEffect(() => {
    saveToSessionStorage("groupFilter", groupFilter);
  }, [groupFilter]);

  useEffect(() => {
    saveToSessionStorage("typeFilter", typeFilter);
  }, [typeFilter]);

  const handleSave = (exercise: Exercise) => {
    if (exercise.isDefault) return; // Prevent saving changes to default exercises

    if (isEditMode && selectedExercise) {
      setExercises(
        exercises.map((ex) => (ex.id === exercise.id ? exercise : ex))
      );
    } else {
      setExercises([...exercises, exercise]);
    }
  };

  const handleDelete = async (id: number) => {
    const exercise = exercises.find((ex) => ex.id === id);
    if (exercise?.isDefault) return; // Prevent deleting default exercises

    try {
      await deleteExercise(id);
      setExercises(exercises.filter((ex) => ex.id !== id));
    } catch (error) {
      console.error("Failed to delete exercise:", error);
    }
  };

  const openEditDialog = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setSelectedExercise(null);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedExercise(null);
  };

  const sortedExercises = exercises
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredExercises = sortedExercises.filter((exercise) => {
    if (exerciseFilter === "default" && !exercise.isDefault) return false;
    if (exerciseFilter === "custom" && exercise.isDefault) return false;
    if (groupFilter !== "all" && exercise.group !== groupFilter) return false;
    if (typeFilter !== "all" && exercise.type !== typeFilter) return false;
    return true;
  });

  const uniqueGroups = Array.from(new Set(exercises.map((ex) => ex.group)));
  const uniqueTypes = Array.from(new Set(exercises.map((ex) => ex.type)));

  return (
    <>
      <PageHeader
        title="Exercise List"
        buttonText="New Exercise"
        buttonAction={openAddDialog}
      />
      <div className="p-4">
        <div className="mb-4 flex space-x-2">
          <Button
            onClick={() => setExerciseFilter("all")}
            variant={exerciseFilter === "all" ? "primary" : "outline"}
            size="sm"
          >
            All Exercises
          </Button>
          <Button
            onClick={() => setExerciseFilter("default")}
            variant={exerciseFilter === "default" ? "primary" : "outline"}
            size="sm"
          >
            Default
          </Button>
          <Button
            onClick={() => setExerciseFilter("custom")}
            variant={exerciseFilter === "custom" ? "primary" : "outline"}
            size="sm"
          >
            Custom
          </Button>
        </div>
        <div className="mb-4 flex space-x-2">
          <label htmlFor="groupFilter" className="mr-2">
            Group:
          </label>
          <select
            id="groupFilter"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Groups</option>
            {uniqueGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex space-x-2">
          <label htmlFor="typeFilter" className="mr-2">
            Type:
          </label>
          <select
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <ExerciseList
          exercises={filteredExercises}
          onEdit={openEditDialog}
          onDelete={handleDelete}
        />
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          title={isEditMode ? "Edit Exercise" : "Add New Exercise"}
        >
          <NewExerciseForm
            onSave={handleSave}
            onClose={closeDialog}
            initialData={selectedExercise || undefined}
          />
        </Dialog>
      </div>
    </>
  );
};

export default Exercises;
