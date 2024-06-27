import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { navbarLinks } from "../../config/navbarConfig";
import { useCurrentView } from "../../contexts/CurrentViewContext"; // Import the context
import { removeFromSessionStorage } from "../../utils/sessionStorageUtils"; // Import session storage utility

const Navbar = () => {
  const {
    viewedMesocycleId,
    viewedWorkoutId,
    setViewedMesocycleId,
    setViewedWorkoutId,
  } = useCurrentView(); // Use the context
  const navigate = useNavigate(); // Use the navigate hook
  const location = useLocation(); // Use location hook

  const handleMesocyclesClick = () => {
    const isViewingSpecificMesocycle = location.pathname.startsWith(
      `/mesocycles/${viewedMesocycleId}`
    );
    const isViewingSpecificWorkout = location.pathname.startsWith(
      `/mesocycles/${viewedMesocycleId}/${viewedWorkoutId}`
    );

    if (isViewingSpecificWorkout || isViewingSpecificMesocycle) {
      // If already viewing a specific mesocycle or workout, navigate to the main mesocycles page
      navigate("/mesocycles");
      setViewedMesocycleId(null);
      setViewedWorkoutId(null);
    } else if (viewedMesocycleId) {
      // If there is a viewed mesocycle, navigate to its page
      if (viewedWorkoutId) {
        navigate(`/mesocycles/${viewedMesocycleId}/${viewedWorkoutId}`);
      } else {
        navigate(`/mesocycles/${viewedMesocycleId}`);
      }
    } else {
      // Otherwise, navigate to the main mesocycles page
      navigate("/mesocycles");
    }
  };

  const handleExercisesClick = () => {
    const isViewingExercises = location.pathname === "/exercises";

    if (isViewingExercises) {
      // Clear session storage only if already on the "Exercises" page
      removeFromSessionStorage("exerciseFilter");
      removeFromSessionStorage("groupFilter");
      removeFromSessionStorage("typeFilter");
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("exercise-")) {
          removeFromSessionStorage(key);
        }
      });

      // Refresh the page
      window.location.reload();
    } else {
      // Navigate to the "Exercises" page
      navigate("/exercises");
    }
  };

  const handleTemplatesClick = () => {
    const isViewingTemplates = location.pathname === "/templates";

    if (isViewingTemplates) {
      // Clear session storage only if already on the "Templates" page
      removeFromSessionStorage("templateFilter");
      removeFromSessionStorage("timesPerWeekFilter");
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("template-")) {
          removeFromSessionStorage(key);
        }
      });

      // Refresh the page
      window.location.reload();
    } else {
      // Navigate to the "Templates" page
      navigate("/templates");
    }
  };

  const isActiveMesocycles =
    location.pathname === "/mesocycles" ||
    (viewedMesocycleId &&
      location.pathname.startsWith(`/mesocycles/${viewedMesocycleId}`)) ||
    (viewedMesocycleId &&
      viewedWorkoutId &&
      location.pathname.startsWith(
        `/mesocycles/${viewedMesocycleId}/${viewedWorkoutId}`
      ));

  const isActiveExercises = location.pathname === "/exercises";
  const isActiveTemplates = location.pathname === "/templates";

  return (
    <nav className="fixed bottom-0 w-full h-20 bg-white border-t border-gray-200 z-20">
      <div className="flex justify-around p-4">
        {navbarLinks.map((link) => {
          if (link.to === "/mesocycles") {
            return (
              <div
                key={link.to}
                onClick={handleMesocyclesClick}
                className={`flex flex-col items-center cursor-pointer ${
                  isActiveMesocycles ? "text-blue-600" : ""
                }`}
              >
                {link.icon}
                <span className="text-xs">{link.label}</span>
              </div>
            );
          } else if (link.to === "/exercises") {
            return (
              <div
                key={link.to}
                onClick={handleExercisesClick}
                className={`flex flex-col items-center cursor-pointer ${
                  isActiveExercises ? "text-blue-600" : ""
                }`}
              >
                {link.icon}
                <span className="text-xs">{link.label}</span>
              </div>
            );
          } else if (link.to === "/templates") {
            return (
              <div
                key={link.to}
                onClick={handleTemplatesClick}
                className={`flex flex-col items-center cursor-pointer ${
                  isActiveTemplates ? "text-blue-600" : ""
                }`}
              >
                {link.icon}
                <span className="text-xs">{link.label}</span>
              </div>
            );
          } else {
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/workout"} // Only use "end" for the "/workout" link
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
              >
                <div className="flex flex-col items-center">
                  {link.icon}
                  <span className="text-xs">{link.label}</span>
                </div>
              </NavLink>
            );
          }
        })}
      </div>
    </nav>
  );
};

export default Navbar;
