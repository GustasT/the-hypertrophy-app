import Dexie from "dexie";

// Define the database
const db = new Dexie("ExerciseDB");
db.version(1).stores({
  exercises: "++id,name,group,type,youtubeLink",
});

// Define the TypeScript interface for an exercise
export interface Exercise {
  id?: number; // Ensure id is a number
  name: string;
  group: string;
  type: string;
  youtubeLink?: string;
}

export default db;
