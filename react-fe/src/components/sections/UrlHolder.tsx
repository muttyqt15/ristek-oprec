import React from "react";
import Button from "../elements/Button";
import { ChevronDown } from "lucide-react";
import { requestMethods } from "../../utils/helpers/requestMethods";

interface UrlHolderProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  handleRequest: (e: React.MouseEvent<HTMLButtonElement>) => void; 
}

const UrlHolder: React.FC<UrlHolderProps> = ({
  url,
  setUrl,
  method,
  setMethod,
  handleRequest,
}) => {
  const [selectedMethod, setSelectedMethod] = React.useState(method);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(e.target.value);
    setMethod(e.target.value);
  };

  return (
    <div className="w-full flex flex-col md:flex-row sm:justify-center items-center m-4 px-4">
      <div className="flex">
        <div className="relative">
          <select
            className="appearance-none border-2 rounded-l-md h-12 px-[4.5px] py-2 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline pr-8"
            value={selectedMethod}
            onChange={handleChange}>
            {requestMethods.map((option) => (
              <option
                key={option.name}
                value={option.method}
                className="text-xs sm:text-sm appearance-none">
                {option.method}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute inset-y-0 right-0 w-4 h-4 mt-4 mr-3 text-white pointer-events-none" />
        </div>
        <form>
          <input
            type="text"
            className="text-xs p-2 w-full sm:min-w-64 h-12 border-t-2 border-b-2 border-r-2 border-l-1 rounded-r-md placeholder:text-sm focus:outline-none border-white bg-gray-800 font-medium text-white"
            placeholder="Enter URL here"
            value={url}
            onChange={handleUrlChange}
          />
        </form>
      </div>
      <Button
        className="w-full max-w-64 md:max-w-40 sm:ml-2"
        onClick={handleRequest} 
      >
        Send Request
      </Button>
    </div>
  );
};

export default UrlHolder;
