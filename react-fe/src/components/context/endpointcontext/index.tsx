import React, { createContext, useContext, useEffect, useState } from "react";
import { EndpointContextInterface } from "../interface";

// Define a default value for createContext
// const defaultEndpointContextValue: EndpointContextInterface = {
//   endpoint: "testing!",
//   setEndpoint: () => {}, // Default setter function
// };

const EndpointContext = createContext({
  endpoint: "auth/signup",
} as EndpointContextInterface);

// Custom hook to consume the EndpointContext
// eslint-disable-next-line react-refresh/only-export-components
export const useEndpointContext = () => useContext(EndpointContext);

export const EndpointProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [endpoint, setEndpoint] = useState("auth/signup");

  useEffect(() => {
    setEndpoint(endpoint);
  }, [endpoint]);

  const contextValue: EndpointContextInterface = {
    endpoint,
    setEndpoint,
  };

  return (
    <EndpointContext.Provider value={contextValue}>
      {children}
    </EndpointContext.Provider>
  );
};
