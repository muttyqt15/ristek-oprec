import { Editor } from "@monaco-editor/react";
import React from "react";
export interface JsonCode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ReqBodyProps {
  setCode: React.Dispatch<React.SetStateAction<string>>;
  code?: string;
}

const RequestBody: React.FC<ReqBodyProps> = ({ setCode, code }) => {
  /**{
    "title": "foo",
    "body": "bar",
    "userId": "1"
} */
  return (
    <div className="w-full mt-4 relative min-h-[800px] border-2 border-yellow-600 rounded-md">
      <h2 className="bg-yellow-600 z-1 text-black h-16 rounded-md text-center text-lg sm:text-2xl font-bold pt-1 flex items-center justify-center">
        Request Body
      </h2>
      <div className="absolute top-16 h-full w-full z-0">
        <Editor
          height="100%"
          width="100%"
          value={code}
          theme="vs-dark"
          defaultLanguage="json"
          options={{
            fontFamily: "Courier New, Courier, monospace",
            minimap: {
              enabled: false,
            },
            contextmenu: false,
          }}
          onChange={(value) => setCode(value || "")} // Pass the onChange handler
        />
      </div>
    </div>
  );
};

export default RequestBody;
