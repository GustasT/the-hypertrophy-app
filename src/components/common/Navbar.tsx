// src/components/common/Navbar.tsx
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { navbarLinks } from "../../config/navbarConfig";
import { useCurrentView } from "../../contexts/CurrentViewContext"; // Import the context

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

  const isActiveMesocycles =
    location.pathname === "/mesocycles" ||
    (viewedMesocycleId &&
      location.pathname.startsWith(`/mesocycles/${viewedMesocycleId}`)) ||
    (viewedMesocycleId &&
      viewedWorkoutId &&
      location.pathname.startsWith(
        `/mesocycles/${viewedMesocycleId}/${viewedWorkoutId}`
      ));

  return (
    <nav className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200 z-20">
      <div className="flex justify-around p-4">
        {navbarLinks.map((link) =>
          link.to === "/mesocycles" ? (
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
          ) : (
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
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
