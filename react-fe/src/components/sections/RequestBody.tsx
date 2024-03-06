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
    <div className="w-full justify-center items-center flex mt-12 relative min-h-48 rounded-md">
      <div className="w-3/4">
        <h2 className="bg-yellow-600 z-1 text-black h-8 rounded-t-xl border-none text-center text-lg font-bold pt-1 flex items-center justify-center">
          Request Body
        </h2>
        <div className="h-64 z-0 border-none rounded-xl">
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
    </div>
  );
};

export default RequestBody;
