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
  workouts: "++id,mesocycleId,week,day,completed",
  logs: "++id,workoutId,exerciseId,sets,weight,reps,workload,pump,soreness",
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

// Define the TypeScript interface for a mesocycle
export interface Mesocycle {
  id?: number;
  name: string;
  templateId: number;
  weeks: number;
  completed: boolean;
  isActive: boolean;
}

// Define the TypeScript interface for a workout
export interface Workout {
  id?: number;
  mesocycleId: number; // Reference to the mesocycle
  week: number; // Week number within the mesocycle
  day: number; // Day number within the week
  completed: boolean; // Status of the workout
}

// Define the TypeScript interface for a log entry
export interface Log {
  id?: number;
  workoutId: number; // Reference to the workout
  exerciseId: number; // Reference to the exercise
  sets: number;
  weight: number;
  reps: number;
  workload: string; // Workload rating
  pump: string; // Pump rating
  soreness: string; // Soreness rating
}

export default db;
