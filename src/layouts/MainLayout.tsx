import React, { ReactNode } from "react";
import Navbar from "../components/common/Navbar";

type Props = { children: ReactNode };

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
