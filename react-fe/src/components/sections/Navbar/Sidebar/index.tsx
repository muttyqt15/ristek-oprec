import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVisibility = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar Content */}
      <div
        className={`z-50 fixed top-0 right-0 h-full w-32 py-6 px-4 bg-gray-900 text-white transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="text-xl font-bold mb-6">Docs</div>
        <ul className="flex flex-col space-y-2">
          <li className="hover:text-gray-300 cursor-pointer">Api 1</li>
          <li className="hover:text-gray-300 cursor-pointer">Api 2</li>
          <li className="hover:text-gray-300 cursor-pointer">Api 3</li>
        </ul>
      </div>
      {/* Sidebar Toggle Button */}
      {isOpen ? (
        <ChevronUp
          onClick={handleVisibility}
          className="z-50 w-4 h-4 fixed top-4 right-2 text-white hover:cursor-pointer hover:text-blue-300 transition transform duration-500 ease-in-out"
        />
      ) : (
        <button
          onClick={handleVisibility}
          className={`fixed top-4 right-6 text-white hover:text-blue-300 transition-opacity duration-300 ease-in-out flex gap-1 items-center ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}>
          <p>APIs</p>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
