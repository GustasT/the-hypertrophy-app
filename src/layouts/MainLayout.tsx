import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-dvh overflow-hidden ">
      <div className="flex-grow overflow-auto mb-20 mt-20 ">
        <Outlet />
        <Navbar />
      </div>
    </div>
  );
};

export default MainLayout;
