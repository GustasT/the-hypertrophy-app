export const saveToSessionStorage = (key: string, value: any) => {
  const serializedValue = JSON.stringify(value);
  sessionStorage.setItem(key, serializedValue);
};

export const getFromSessionStorage = (key: string) => {
  const serializedValue = sessionStorage.getItem(key);
  if (serializedValue) {
    return JSON.parse(serializedValue);
  }
  return null;
};

export const removeFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
