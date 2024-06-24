import { Template } from "./db";
import Dexie from "dexie";

export const defaultTemplates: Omit<Template, "id">[] = [
  {
    name: "Superman Workout",
    timesPerWeek: 5,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Chest", "Chest", "Shoulders", "Shoulders", "Back"],
      },
      {
        name: "Tue",
        muscleGroups: ["Quads", "Hamstrings", "Triceps", "Biceps"],
      },
      {
        name: "Wed",
        muscleGroups: ["Back", "Back", "Chest", "Chest", "Shoulders"],
      },
      {
        name: "Thu",
        muscleGroups: ["Biceps", "Triceps", "Hamstrings", "Quads"],
      },
      {
        name: "Fri",
        muscleGroups: ["Shoulders", "Shoulders", "Back", "Back", "Chest"],
      },
    ],
  },
  {
    name: "Thor Workout",
    timesPerWeek: 5,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Back", "Back", "Shoulders", "Biceps", "Triceps"],
      },
      { name: "Tue", muscleGroups: ["Quads", "Hamstrings", "Chest", "Abs"] },
      {
        name: "Wed",
        muscleGroups: ["Shoulders", "Shoulders", "Back", "Biceps", "Triceps"],
      },
      { name: "Thu", muscleGroups: ["Chest", "Abs", "Quads", "Hamstrings"] },
      {
        name: "Fri",
        muscleGroups: [
          "Back",
          "Back",
          "Biceps",
          "Biceps",
          "Triceps",
          "Triceps",
          "Shoulders",
        ],
      },
    ],
  },
  {
    name: "Upper Body Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Chest",
          "Triceps",
          "Shoulders",
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
        ],
      },
      { name: "Tue", muscleGroups: ["Back", "Back", "Biceps", "Shoulders"] },
      {
        name: "Thu",
        muscleGroups: [
          "Triceps",
          "Triceps",
          "Chest",
          "Shoulders",
          "Glutes",
          "Quads",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Biceps",
          "Biceps",
          "Back",
          "Shoulders",
          "Hamstrings",
          "Calves",
        ],
      },
    ],
  },
];

// Function to populate default templates into the database
export async function populateDefaultTemplates(db: Dexie) {
  for (const template of defaultTemplates) {
    const existingTemplate = await db
      .table("templates")
      .where({ name: template.name })
      .first();
    if (!existingTemplate) {
      await db.table("templates").add({ ...template, isDefault: true });
    }
  }
}
