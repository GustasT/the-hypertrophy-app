import { useState, useEffect } from "react";
import { fetchAllExercises, deleteExercise } from "../../services";
import { Exercise } from "../../database/db";
import NewExerciseForm from "./NewExerciseForm";
import ExerciseList from "./ExerciseList";
import Dialog from "../../components/Dialog";
import PageHeader from "../../components/common/PageHeader";

const Exercises = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Fetch exercises from IndexedDB when the component mounts
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

  return (
    <>
      <PageHeader
        title="Exercise List"
        buttonText="New Exercise"
        buttonAction={openAddDialog}
      />
      <div className="p-4">
        <ExerciseList
          exercises={exercises}
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
