import axios, { isAxiosError } from "axios";
import React, { useState } from "react";
import Layout from "./components/Layout";
import { useEndpointContext } from "./components/context/endpointcontext";
import RequestBody, { JsonCode } from "./components/sections/RequestBody";
import ResponseBody from "./components/sections/ResponseBody";
import UrlHolder from "./components/sections/UrlHolder";
import { hasProtocol } from "./utils/helpers/regex";

const App = () => {
  const { endpoint } = useEndpointContext();
  const [jsonCode, setJsonCode] = useState<string>(
    '{\n\t"name": "kak coolguy",\n\t"batch": 2021,\n\t"password": "coolguysSecret_password",\n\t"role": "SUPER ADMIN"\n}'
  );
  const [response, setResponse] = useState<JsonCode>({
    "Your response will appear...": "Here!",
  });

  const [url, setUrl] = useState(
    `${import.meta.env.VITE_PROD_PORT}/${endpoint}`
  );
  const [selectedMethod, setSelectedMethod] = useState("GET");
  const handleRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const realJson = JSON.parse(jsonCode as string);
      const hasHttpProtocol = hasProtocol(url);

      if (!hasHttpProtocol) {
        setUrl("http://" + url);
      } else {
        setUrl(url); // Otherwise, set the URL as it is
      }
      const responsez = await axios({
        url: url,
        method: selectedMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            localStorage.getItem("accessToken") === null ||
            localStorage.getItem("accessToken") === undefined
              ? undefined
              : `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
        data:
          selectedMethod !== "GET" && selectedMethod !== "HEAD"
            ? realJson
            : undefined,
      });
      if (
        url === `${import.meta.env.VITE_PROD_PORT}/auth/signup` ||
        url === `${import.meta.env.VITE_PROD_PORT}/auth/login`
      ) {
        localStorage.setItem(
          "accessToken",
          responsez.data?.tokens?.accessToken
        );
      }
      setResponse(responsez.data);
    } catch (err) {
      console.error(err);
      if (isAxiosError(err) && err.response && err.response.status === 401) {
        setResponse({ message: "Unauthorized!", status: 401 });
      } else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 403
      ) {
        setResponse({ message: "Forbidden!", status: 403 });
      } else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 409
      ) {
        setResponse({ message: "Conflict!", status: 409 });
      } else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 404
      ) {
        setResponse({ message: "Not found!", status: 404 });
      } else {
        setResponse(err as JsonCode);
      }
    }
  };
  return (
    <Layout className="px-4">
      <UrlHolder
        url={url}
        setUrl={setUrl}
        method={selectedMethod}
        setMethod={setSelectedMethod}
        handleRequest={handleRequest}
      />
      <ResponseBody newCode={response} />
      <h1 className="hidden xl:flex text-yellow-600 text-lg font-bold mt-12 absolute right-48 top-32 w-64 text-center">
        Get started with the /auth/signup and /auth/login endpoints! <br />{" "}
        Don't forget to read the docs in the backend website! (Both are
        deployed)
      </h1>
      <RequestBody setCode={setJsonCode} code={jsonCode} />
    </Layout>
  );
};

export default App;
