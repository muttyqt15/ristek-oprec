import React from "react";
import Navbar from "./sections/Navbar";
import "./styles/fonts.css";
import { cn } from "../utils/lib/utils";
const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gray-800">
        <main className={cn("flex flex-col items-center w-full", className)}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
