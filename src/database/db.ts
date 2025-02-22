import Dexie, { Table } from "dexie";
import { defaultExercises } from "./defaultExercises"; // Import default exercises
import { defaultTemplates } from "./defaultTemplates";

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

    this.version(6).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts:
        "++id,mesocycleId,week,day,completed,isActive,[mesocycleId+isActive],[mesocycleId+id]", // Add compound index
    });

    this.version(7).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts:
        "++id,mesocycleId,week,day,completed,isActive,[mesocycleId+isActive],[mesocycleId+id],[mesocycleId+week+day]", // Add compound index
    });

    this.version(8).stores({
      exercises: "++id,name,group,type,youtubeLink",
      templates: "++id,name,timesPerWeek,days",
      mesocycles: "++id,name,templateId,weeks,completed,isActive",
      workouts:
        "++id,mesocycleId,week,day,name,completed,isActive,[mesocycleId+isActive],[mesocycleId+id],[mesocycleId+week+day]", // Add name to the schema
    });

    this.on("populate", async () => {
      await this.populateDefaultTemplates();
      await this.populateDefaultExercises();
    });
  }

  async populateDefaultTemplates() {
    console.log("Populating default templates...");
    for (const template of defaultTemplates) {
      const existingTemplate = await this.templates.get(template.id);
      if (!existingTemplate) {
        await this.templates.add(template);
      }
    }
  }

  async populateDefaultExercises() {
    console.log("Populating default exercises...");
    for (const exercise of defaultExercises) {
      const existingExercise = await this.exercises.get(exercise.id);
      if (!existingExercise) {
        await this.exercises.add(exercise);
      }
    }
  }
}

const db = new ExerciseDB();

export default db;

export interface Exercise {
  id: number;
  name: string;
  group: string;
  type: string;
  youtubeLink?: string;
  isDefault?: boolean; // New field to identify default exercises
}

export interface Template {
  id: number;
  name: string;
  timesPerWeek: number;
  days: { name: string; muscleGroups: string[] }[];
  isDefault?: boolean; // New field to identify default templates
}

export interface Mesocycle {
  id: number;
  name: string;
  templateId: number;
  timesPerWeek: number;
  weeks: number;
  workouts: number[];
  completed: number;
  isActive: number;
}

export interface Workout {
  id: number;
  mesocycleId: number;
  week: number;
  day: number;
  name: string;
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
