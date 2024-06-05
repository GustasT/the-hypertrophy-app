import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-auto mb-16">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
