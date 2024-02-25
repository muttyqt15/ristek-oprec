import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import RequestBody, { JsonCode } from "./components/sections/RequestBody";
import ResponseBody from "./components/sections/ResponseBody";
import UrlHolder from "./components/sections/UrlHolder";
import axios from "axios";

const App = () => {
  const [jsonCode, setJsonCode] = useState<string>("{\n\t\n}");
  const [response, setResponse] = useState<JsonCode>({ hello: "test!" });
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const [selectedMethod, setSelectedMethod] = useState("GET");

  const handleRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const realJson = JSON.parse(jsonCode as string);
      console.log("URL:", url);
      console.log("Method:", selectedMethod);
      console.log("Request Body:", realJson);

      const responsez = await axios({
        url: url,
        method: selectedMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YourAccessToken",
          Accept: "application/json",
        },
        // data:
        //   selectedMethod !== "GET" && selectedMethod !== "HEAD"
        //     ? realJson
        //     : undefined,
      });
      setResponse(responsez.data);
      console.log("data:", responsez.data);
      console.log("status:", responsez.status);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    console.log("Updated Response:", response);
  }, [response]); 
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
      <RequestBody setCode={setJsonCode} code={jsonCode} />
    </Layout>
  );
};

export default App;
