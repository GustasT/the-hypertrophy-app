import React from "react";

interface TabNavigationProps {
  timesPerWeek: number;
  activeTab: number;
  onTabClick: (index: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  timesPerWeek,
  activeTab,
  onTabClick,
}) => {
  return (
    <div className="tabs flex mb-4 border-b-2 border-gray-200">
      {[...Array(timesPerWeek)].map((_, i) => (
        <button
          key={i}
          type="button"
          className={`tab px-4 py-2 rounded-t-lg ${
            activeTab === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onTabClick(i)}
        >
          Day {i + 1}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
