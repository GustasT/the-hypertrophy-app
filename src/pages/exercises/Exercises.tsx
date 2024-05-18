import React, { useState, useEffect } from "react";

import db, { Exercise } from "../../database/db";
import NewExerciseForm from "./NewExerciseForm";
import ExerciseList from "./ExerciseList";
import Message from "../../components/Message";
import Dialog from "../../components/Dialog";

type Props = {};

const Exercises = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Fetch exercises from IndexedDB when the component mounts
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const allExercises = await db.table("exercises").toArray();
        setExercises(allExercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleSave = (exercise: Exercise) => {
    if (isEditMode && selectedExercise) {
      setExercises(
        exercises.map((ex) => (ex.id === exercise.id ? exercise : ex))
      );
      setMessage("Exercise updated successfully!");
    } else {
      setExercises([...exercises, exercise]);
      setMessage("Exercise added successfully!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.table("exercises").delete(id);
      setExercises(exercises.filter((ex) => ex.id !== id));
      setMessage("Exercise deleted successfully!");
    } catch (error) {
      console.error("Failed to delete exercise:", error);
      setMessage("Failed to delete exercise.");
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
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Exercise List</h1>
        <button
          type="button"
          className="bg-blue-500 text-white pl-4 pr-4 py-2 rounded hover:bg-blue-600"
          onClick={openAddDialog}
        >
          + New
        </button>
      </div>
      {message && <Message message={message} />}
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
  );
};

export default Exercises;
