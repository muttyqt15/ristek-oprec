import React from "react";
import Button from "../elements/Button";
import { ChevronDown } from "lucide-react";
import { requestMethods } from "../../utils/helpers/requestMethods";

const UrlHolder = () => {
  const [url, setUrl] = React.useState("jsonplaceholder.typicode.com/posts/1");
  const [selectedMethod, setSelectedMethod] = React.useState("GET");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log("Form submitted with URL:", url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="flex">
      <div className="relative">
        <select
          className="appearance-none border-2 rounded-l-md w-24 h-12 px-[4.5px] py-2 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline pr-8"
          value={selectedMethod}
          onChange={handleChange}>
          {requestMethods.map((option) => (
            <option key={option.name} value={option.method} className="text-xs appearance-none">
              {option.method}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute inset-y-0 right-0 w-4 h-4 mt-4 mr-3 text-white pointer-events-none" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-xs p-2 min-w-64 h-12 border-t-2 border-b-2 border-r-2 border-l-1 rounded-r-md placeholder:text-sm focus:outline-none border-white bg-gray-800 font-medium text-white"
          placeholder="Enter URL here"
          value={url}
          onChange={handleUrlChange}
        />
        <Button className="ml-4" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default UrlHolder;
