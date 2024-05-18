import { GiWeightLiftingUp } from "react-icons/gi";
import {
  MdOutlinePlaylistAddCheck,
  MdDashboardCustomize,
  MdOutlineRestartAlt,
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
  {
    to: "/newMesocycle",
    label: "New Mesocycle",
    icon: <MdOutlineRestartAlt />,
  },
  { to: "/workout", label: "Workout", icon: <GiWeightLiftingUp /> },
];
