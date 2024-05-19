import React from "react";
import { deleteDatabase } from "../utils/dbUtils";

const DeleteDatabaseButton: React.FC = () => {
  const handleDeleteDatabase = async () => {
    try {
      await deleteDatabase();
      alert("Database deleted successfully");
    } catch (error) {
      console.error("Failed to delete database:", error);
      alert("Failed to delete database");
    }
  };

  return (
    <button
      type="button"
      className="bg-red-600 text-white pl-4 pr-4 py-2 rounded hover:bg-red-700"
      onClick={handleDeleteDatabase}
    >
      Delete Database
    </button>
  );
};

export default DeleteDatabaseButton;
