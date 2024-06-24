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
    name: "Glutes & Abs Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Glutes", "Glutes", "Hamstrings", "Chest", "Back"],
      },
      {
        name: "Tue",
        muscleGroups: ["Quads", "Abs", "Shoulders", "Triceps", "Biceps"],
      },
      {
        name: "Wed",
        muscleGroups: ["Glutes", "Glutes", "Hamstrings", "Back", "Chest"],
      },
      {
        name: "Thu",
        muscleGroups: ["Quads", "Abs", "Shoulders", "Biceps", "Triceps"],
      },
      {
        name: "Fri",
        muscleGroups: ["Glutes", "Glutes", "Hamstrings", "Chest", "Back"],
      },
      {
        name: "Sat",
        muscleGroups: ["Quads", "Abs", "Shoulders", "Triceps", "Biceps"],
      },
    ],
  },

  {
    name: "Chest & Triceps Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Chest", "Chest", "Chest", "Triceps"],
      },
      {
        name: "Tue",
        muscleGroups: ["Triceps", "Triceps", "Triceps", "Chest"],
      },
      {
        name: "Wed",
        muscleGroups: [
          "Back",
          "Biceps",
          "Shoulders",
          "Quads",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Thu",
        muscleGroups: ["Chest", "Chest", "Chest", "Triceps"],
      },
      {
        name: "Fri",
        muscleGroups: ["Triceps", "Triceps", "Triceps", "Chest"],
      },
      {
        name: "Sat",
        muscleGroups: [
          "Shoulders",
          "Biceps",
          "Back",
          "Quads",
          "Hamstrings",
          "Calves",
        ],
      },
    ],
  },

  {
    name: "Back & Biceps Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Back", "Back", "Back", "Biceps", "Forearms"],
      },
      {
        name: "Tue",
        muscleGroups: ["Biceps", "Biceps", "Biceps", "Back"],
      },
      {
        name: "Wed",
        muscleGroups: [
          "Chest",
          "Triceps",
          "Shoulders",
          "Quads",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Thu",
        muscleGroups: ["Back", "Back", "Back", "Biceps", "Forearms", "Quads"],
      },
      {
        name: "Fri",
        muscleGroups: ["Biceps", "Biceps", "Biceps", "Back"],
      },
      {
        name: "Sat",
        muscleGroups: [
          "Shoulders",
          "Triceps",
          "Chest",
          "Quads",
          "Hamstrings",
          "Calves",
        ],
      },
    ],
  },

  {
    name: "Arms & Shoulders Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Triceps",
          "Triceps",
          "Chest",
          "Shoulders",
          "Forearms",
          "Quads",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Biceps",
          "Biceps",
          "Back",
          "Shoulders",
          "Forearms",
          "Hamstrings",
        ],
      },
      {
        name: "Wed",
        muscleGroups: ["Triceps", "Triceps", "Chest", "Forearms", "Calves"],
      },
      {
        name: "Thu",
        muscleGroups: ["Biceps", "Biceps", "Back", "Forearms", "Quads"],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Shoulders",
          "Shoulders",
          "Triceps",
          "Triceps",
          "Chest",
          "Hamstrings",
        ],
      },
      {
        name: "Sat",
        muscleGroups: [
          "Shoulders",
          "Shoulders",
          "Biceps",
          "Biceps",
          "Back",
          "Calves",
        ],
      },
    ],
  },

  {
    name: "Chest & Back Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Chest", "Chest", "Triceps", "Shoulders", "Quads"],
      },
      {
        name: "Tue",
        muscleGroups: ["Back", "Biceps", "Hamstrings"],
      },
      {
        name: "Wed",
        muscleGroups: ["Chest", "Chest", "Triceps", "Shoulders", "Calves"],
      },
      {
        name: "Thu",
        muscleGroups: ["Back", "Back", "Biceps", "Quads"],
      },
      {
        name: "Fri",
        muscleGroups: ["Chest", "Chest", "Triceps", "Shoulders", "Hamstrings"],
      },
      {
        name: "Sat",
        muscleGroups: ["Back", "Back", "Biceps", "Calves"],
      },
    ],
  },

  {
    name: "Lower Body Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Quads", "Calves", "Chest", "Chest"],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Glutes",
          "Glutes",
          "Hamstrings",
          "Calves",
          "Back",
          "Back",
        ],
      },
      {
        name: "Wed",
        muscleGroups: ["Biceps", "Biceps", "Triceps", "Shoulders", "Abs"],
      },
      {
        name: "Thu",
        muscleGroups: ["Quads", "Quads", "Calves", "Chest", "Chest"],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Hamstrings",
          "Hamstrings",
          "Glutes",
          "Calves",
          "Back",
          "Back",
        ],
      },
      {
        name: "Sat",
        muscleGroups: ["Triceps", "Triceps", "Biceps", "Shoulders", "Abs"],
      },
    ],
  },
  {
    name: "Upper Body Emphasis",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Chest",
          "Chest",
          "Triceps",
          "Shoulders",
          "Quads",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Back",
          "Back",
          "Back",
          "Biceps",
          "Shoulders",
          "Forearms",
          "Hamstrings",
        ],
      },
      {
        name: "Wed",
        muscleGroups: ["Triceps", "Triceps", "Triceps", "Chest", "Calves"],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Biceps",
          "Biceps",
          "Biceps",
          "Back",
          "Forearms",
          "Quads",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Shoulders",
          "Shoulders",
          "Traps",
          "Chest",
          "Triceps",
          "Hamstrings",
        ],
      },
      {
        name: "Sat",
        muscleGroups: [
          "Shoulders",
          "Shoulders",
          "Back",
          "Biceps",
          "Forearms",
          "Calves",
        ],
      },
    ],
  },
  {
    name: "Whole Body Daily",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Back",
          "Triceps",
          "Biceps",
          "Shoulders",
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Triceps",
          "Biceps",
          "Shoulders",
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
          "Back",
          "Chest",
        ],
      },
      {
        name: "Wed",
        muscleGroups: [
          "Shoulders",
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
          "Back",
          "Chest",
          "Biceps",
          "Triceps",
        ],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
          "Back",
          "Chest",
          "Biceps",
          "Triceps",
          "Shoulders",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Glutes",
          "Hamstrings",
          "Calves",
          "Back",
          "Chest",
          "Biceps",
          "Triceps",
          "Shoulders",
          "Quads",
        ],
      },
      {
        name: "Sat",
        muscleGroups: [
          "Back",
          "Chest",
          "Biceps",
          "Triceps",
          "Shoulders",
          "Quads",
          "Calves",
          "Hamstrings",
          "Glutes",
        ],
      },
    ],
  },

  {
    name: "Whole Body Split",
    timesPerWeek: 6,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Chest",
          "Triceps",
          "Triceps",
          "Shoulders",
          "Shoulders",
        ],
      },
      {
        name: "Tue",
        muscleGroups: ["Quads", "Quads", "Glutes", "Hamstrings"],
      },
      {
        name: "Wed",
        muscleGroups: ["Back", "Back", "Biceps", "Biceps", "Calves"],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Shoulders",
          "Shoulders",
          "Triceps",
          "Triceps",
          "Chest",
          "Chest",
        ],
      },
      {
        name: "Fri",
        muscleGroups: ["Glutes", "Hamstrings", "Quads", "Quads"],
      },
      {
        name: "Sat",
        muscleGroups: ["Biceps", "Biceps", "Back", "Back", "Calves"],
      },
    ],
  },

  {
    name: "Glutes & Abs Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Glutes",
          "Glutes",
          "Abs",
          "Shoulders",
          "Back",
          "Biceps",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Quads",
          "Hamstrings",
          "Abs",
          "Calves",
          "Shoulders",
          "Triceps",
          "Chest",
        ],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Glutes",
          "Glutes",
          "Abs",
          "Shoulders",
          "Back",
          "Biceps",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Quads",
          "Hamstrings",
          "Abs",
          "Calves",
          "Shoulders",
          "Triceps",
          "Chest",
        ],
      },
    ],
  },
  {
    name: "Chest & Triceps Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Chest",
          "Triceps",
          "Back",
          "Biceps",
          "Quads",
          "Glutes",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Triceps",
          "Triceps",
          "Chest",
          "Shoulders",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Chest",
          "Chest",
          "Triceps",
          "Biceps",
          "Back",
          "Quads",
          "Glutes",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Triceps",
          "Triceps",
          "Chest",
          "Shoulders",
          "Hamstrings",
          "Calves",
        ],
      },
    ],
  },
  {
    name: "Back & Biceps Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Back",
          "Back",
          "Biceps",
          "Chest",
          "Triceps",
          "Quads",
          "Glutes",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Biceps",
          "Biceps",
          "Back",
          "Shoulders",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Back",
          "Back",
          "Biceps",
          "Triceps",
          "Chest",
          "Quads",
          "Glutes",
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
  {
    name: "Arms & Shoulders Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Triceps",
          "Triceps",
          "Chest",
          "Shoulders",
          "Quads",
          "Glutes",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Biceps",
          "Biceps",
          "Back",
          "Shoulders",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Shoulders",
          "Triceps",
          "Triceps",
          "Chest",
          "Quads",
          "Glutes",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Shoulders",
          "Biceps",
          "Biceps",
          "Back",
          "Hamstrings",
          "Calves",
        ],
      },
    ],
  },
  {
    name: "Chest & Back Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Chest", "Chest", "Triceps", "Quads", "Shoulders"],
      },
      {
        name: "Tue",
        muscleGroups: ["Back", "Back", "Biceps", "Hamstrings"],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Chest",
          "Chest",
          "Chest",
          "Triceps",
          "Quads",
          "Shoulders",
        ],
      },
      {
        name: "Fri",
        muscleGroups: ["Back", "Back", "Back", "Biceps", "Hamstrings"],
      },
    ],
  },
  {
    name: "Lower Body Emphasis",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: ["Quads", "Quads", "Calves", "Chest", "Back"],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Glutes",
          "Glutes",
          "Hamstrings",
          "Triceps",
          "Biceps",
          "Shoulders",
        ],
      },
      {
        name: "Thu",
        muscleGroups: ["Quads", "Quads", "Calves", "Back", "Chest"],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Hamstrings",
          "Hamstrings",
          "Glutes",
          "Biceps",
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
  {
    name: "Whole Body Daily",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Triceps",
          "Back",
          "Biceps",
          "Shoulders",
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
        ],
      },
      {
        name: "Tue",
        muscleGroups: [
          "Quads",
          "Glutes",
          "Hamstrings",
          "Calves",
          "Chest",
          "Triceps",
          "Back",
          "Biceps",
          "Shoulders",
        ],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Shoulders",
          "Biceps",
          "Back",
          "Triceps",
          "Chest",
          "Calves",
          "Hamstrings",
          "Glutes",
          "Quads",
        ],
      },
      {
        name: "Fri",
        muscleGroups: [
          "Calves",
          "Hamstrings",
          "Glutes",
          "Quads",
          "Shoulders",
          "Biceps",
          "Back",
          "Triceps",
          "Chest",
        ],
      },
    ],
  },
  {
    name: "Whole Body Split",
    timesPerWeek: 4,
    days: [
      {
        name: "Mon",
        muscleGroups: [
          "Chest",
          "Chest",
          "Triceps",
          "Back",
          "Back",
          "Biceps",
          "Shoulders",
        ],
      },
      {
        name: "Tue",
        muscleGroups: ["Quads", "Quads", "Glutes", "Hamstrings", "Calves"],
      },
      {
        name: "Thu",
        muscleGroups: [
          "Shoulders",
          "Biceps",
          "Biceps",
          "Back",
          "Triceps",
          "Triceps",
          "Chest",
        ],
      },
      {
        name: "Fri",
        muscleGroups: ["Hamstrings", "Hamstrings", "Glutes", "Quads", "Calves"],
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
