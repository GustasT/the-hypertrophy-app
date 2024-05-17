import React, { useState, useEffect } from "react";
import db, { Exercise } from "../../database/db";
import NewExerciseForm from "./NewExerciseForm";
import ExerciseList from "./ExerciseList";
import Message from "../../components/Message";
import Dialog from "../../components/Dialog";

type Props = {};

const Exercises = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleSave = (newExercise: Exercise) => {
    setExercises([...exercises, newExercise]);
    setMessage("Exercise added successfully!");
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Exercise List</h1>
        <button
          type="button"
          className="bg-blue-500 text-white pl-4 pr-4 py-2 hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          + New
        </button>
      </div>
      {message && <Message message={message} />}
      <ExerciseList exercises={exercises} />
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Add New Exercise"
      >
        <NewExerciseForm
          onSave={handleSave}
          onClose={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default Exercises;
