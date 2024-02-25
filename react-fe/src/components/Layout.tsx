import React from "react";
import Navbar from "./sections/Navbar";
import "./styles/fonts.css";
import { cn } from "../utils/lib/utils";
import Sidebar from "./sections/Navbar/Sidebar";

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative min-h-screen w-full bg-gray-800">
      <div className="flex">
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <div className="w-full">
          <Navbar />
          <main className={cn("flex flex-col items-center w-full", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
