// src/config/navbarConfig.tsx
import { GiWeightLiftingUp } from "react-icons/gi";
import {
  MdOutlinePlaylistAddCheck,
  MdDashboardCustomize,
} from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";

export const navbarLinks = [
  { to: "/exercises", label: "Exercises", icon: <PiNotebookFill /> },
  { to: "/templates", label: "Templates", icon: <MdDashboardCustomize /> },
  {
    to: "/mesocycles",
    label: "Mesocycles",
    icon: <MdOutlinePlaylistAddCheck />,
  },
  { to: "/workout", label: "Workout", icon: <GiWeightLiftingUp /> },
];
