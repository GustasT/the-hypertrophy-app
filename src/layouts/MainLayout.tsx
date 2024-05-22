import React, { ReactNode } from "react";
import Navbar from "../components/common/navbar/Navbar";

type Props = { children: ReactNode };

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-dvh overflow-hidden ">
      <div className="flex-grow overflow-auto mb-12">{children}</div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
