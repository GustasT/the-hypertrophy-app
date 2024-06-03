export const saveToLocalStorage = (key: string, value: any) => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};

export const getFromLocalStorage = (key: string) => {
  const serializedValue = localStorage.getItem(key);
  if (serializedValue) {
    return JSON.parse(serializedValue);
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const removeWorkoutKeysFromLocalStorage = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("workout")) {
      localStorage.removeItem(key);
    }
  });
};
