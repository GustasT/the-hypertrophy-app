// src/contexts/CurrentViewContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CurrentViewContextType {
  viewedMesocycleId: number | null;
  viewedWorkoutId: number | null;
  setViewedMesocycleId: (id: number | null) => void;
  setViewedWorkoutId: (id: number | null) => void;
}

const CurrentViewContext = createContext<CurrentViewContextType | undefined>(
  undefined
);

export const useCurrentView = () => {
  const context = useContext(CurrentViewContext);
  if (!context) {
    throw new Error("useCurrentView must be used within a CurrentViewProvider");
  }
  return context;
};

export const CurrentViewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [viewedMesocycleId, setViewedMesocycleId] = useState<number | null>(
    null
  );
  const [viewedWorkoutId, setViewedWorkoutId] = useState<number | null>(null);

  return (
    <CurrentViewContext.Provider
      value={{
        viewedMesocycleId,
        viewedWorkoutId,
        setViewedMesocycleId,
        setViewedWorkoutId,
      }}
    >
      {children}
    </CurrentViewContext.Provider>
  );
};
