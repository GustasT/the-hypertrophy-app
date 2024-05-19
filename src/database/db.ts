import Dexie from "dexie";

// Define the database
const db = new Dexie("ExerciseDB");
db.version(1).stores({
  exercises: "++id,name,group,type,youtubeLink",
});
db.version(2).stores({
  exercises: "++id,name,group,type,youtubeLink",
  templates: "++id,name,timesPerWeek,days",
});

// Define the TypeScript interface for an exercise
export interface Exercise {
  id?: number; // Ensure id is a number
  name: string;
  group: string;
  type: string;
  youtubeLink?: string;
}

// Define the TypeScript interface for a template
export interface Template {
  id?: number;
  name: string;
  timesPerWeek: number;
  days: { name: string; muscleGroups: string[] }[];
}

export default db;

export const deleteDatabase = async () => {
  await db.delete();
  console.log("Database deleted successfully");
};
