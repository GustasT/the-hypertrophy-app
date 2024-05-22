import db from "../database/db";

export const fetchAllTemplates = async () => {
  try {
    const allTemplates = await db.table("templates").toArray();
    return allTemplates;
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return [];
  }
};
