export const deleteDatabase = async () => {
  const dbName = "MyDatabase"; // Ensure this matches the actual name of your database
  const request = indexedDB.deleteDatabase(dbName);

  return new Promise<void>((resolve, reject) => {
    request.onsuccess = () => {
      console.log("Database deleted successfully");
      resolve();
    };
    request.onerror = (event) => {
      console.error("Failed to delete database:", event);
      reject("Failed to delete database");
    };
    request.onblocked = (event) => {
      console.warn("Database deletion is blocked:", event);
      reject("Database deletion is blocked");
    };
  });
};
