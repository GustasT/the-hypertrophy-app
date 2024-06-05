import Dexie, { Table } from "dexie";

// Define the database
class ExerciseDB extends Dexie {
  exercises!: Table<Exercise>;
  templates!: Table<Template>;
  mesocycles!: Table<Mesocycle>;
  workouts!: Table<Workout>;

  constructor() {
    super("ExerciseDB");
    this.version(1).stores({
      exercises: "++id,name,group,type,youtubeLink",
    });

    this.version(2).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
    });

    this.version(3).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts: "++id,mesocycleId,week,day,completed,isActive",
    });

    this.version(4).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts: "++id,mesocycleId,week,day,completed,isActive",
    });

    this.version(5).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts:
        "++id,mesocycleId,week,day,completed,isActive,[mesocycleId+isActive]",
    });

    // Add version 6 to add the compound index [mesocycleId+id]
    this.version(6).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts:
        "++id,mesocycleId,week,day,completed,isActive,[mesocycleId+isActive],[mesocycleId+id]", // Add compound index
    });
  }
}

const db = new ExerciseDB();

export default db;

export interface Exercise {
  id?: number;
  name: string;
  group: string;
  type: string;
  youtubeLink?: string;
}

export interface Template {
  id?: number;
  name: string;
  timesPerWeek: number;
  days: { name: string; muscleGroups: string[] }[];
}

export interface Mesocycle {
  id?: number;
  name: string;
  templateId: number;
  timesPerWeek: number;
  weeks: number;
  workouts: number[];
  completed: number;
  isActive: number;
}

export interface Workout {
  id?: number;
  mesocycleId: number;
  week: number;
  day: number;
  exercises: ExerciseWithDetails[];
  completed: number;
  isActive: number;
}

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
  sets?: { reps: number; weight: number }[];
}
