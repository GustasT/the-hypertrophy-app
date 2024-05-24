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

db.version(3).stores({
  exercises: "++id,name,group,type,youtubeLink",
  templates: "++id,name,timesPerWeek,days",
  mesocycles: "++id,name,templateId,weeks,completed,isActive",
  workouts: "++id,mesocycleId,week,day,completed,isActive",
});

db.version(4).stores({
  exercises: "++id,name,group,type,youtubeLink",
  templates: "++id,name,timesPerWeek,days",
  mesocycles: "++id,name,templateId,weeks,completed,isActive",
  workouts: "++id,mesocycleId,week,day,completed,isActive",
});

// Define the TypeScript interface for an exercise
export interface Exercise {
  id?: number;
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

// Define the TypeScript interface for a mesocycle
export interface Mesocycle {
  id?: number;
  name: string;
  templateId: number;
  weeks: number;
  timesPerWeek: number; // Add this line
  workouts: number[]; // Array of Workout IDs
  completed: boolean;
  isActive: number;
}

// Define the TypeScript interface for a workout
export interface Workout {
  id?: number;
  mesocycleId: number;
  week: number;
  day: number;
  exercises: ExerciseWithDetails[];
  completed: boolean;
  isActive: number;
}

// Define the TypeScript interface for an exercise with details
export interface ExerciseWithDetails extends Exercise {
  weightRecommended: number;
  weightCompleted?: number;
  repsRecommended: number;
  repsCompleted?: number;
  setsRecommended: number;
  setsCompleted?: number;
  sorenessRating?: number;
  pumpRating?: number;
  workloadRating?: number;
}

export default db;
