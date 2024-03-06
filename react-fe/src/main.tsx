import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { EndpointProvider } from "./components/context/endpointcontext/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EndpointProvider>
      <App />
    </EndpointProvider>
  </React.StrictMode>
);
