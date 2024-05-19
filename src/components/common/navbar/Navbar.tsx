import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../../config/navbarConfig";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200">
      <div className="flex justify-around p-4">
        {navbarLinks.map((link) => (
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
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
