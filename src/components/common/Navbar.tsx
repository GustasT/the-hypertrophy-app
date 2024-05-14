import { NavLink } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around p-4">
        <NavLink
          to="/workout"
          end
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Workout
        </NavLink>
        <NavLink
          to="/templates"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Templates
        </NavLink>
        <NavLink
          to="/mesocycles"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Mesocycles
        </NavLink>
        <NavLink
          to="/newMesocycle"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          New Mesocycle
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
