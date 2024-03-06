import { useState } from "react";
import { useEndpointContext } from "../../../context/endpointcontext";

interface accordionProps {
  title: string;
  endpoints: string[];
}

const Accordion = ({ title, endpoints }: accordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const { setEndpoint } = useEndpointContext();

  return (
    <div className="border-none rounded-xl mb-2 text-left">
      <button
        className={`w-full py-2 px-4 hover:bg-blue-900 focus:outline-none rounded-t-xl ${
          isOpen ? "bg-blue-950" : ""
        }`}
        onClick={toggleAccordion}>
        {title}
      </button>
      <div
        className={`overflow-hidden transition-max-height ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}>
        <div className="p-4 border-t border-gray-300">
          <ul>
            {endpoints.map((endpoint, index) => (
              <li key={index} className="py-1 text-sm text-center">
                <button
                  onClick={() => {
                    console.log(endpoint);
                    setEndpoint(endpoint);
                    console.log("RUns!");
                  }}>
                  {endpoint}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
