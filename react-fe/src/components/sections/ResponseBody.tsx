import { JsonCode } from "./RequestBody";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const ResponseBody = ({ newCode }: { newCode: JsonCode | string }) => {
  return (
    <div className="max-w-[550px] w-full border-yellow-300 rounded-xl overflow-hidden h-[200px]">
      {/* <pre className="p-4 px-6 overflow-y-auto text-green-300 break-all whitespace-pre-wrap">
        <p className="font-mono">{JSON.stringify(newCode, null, 2)}</p>
      </pre> */}
      <SyntaxHighlighter
        language="json"
        style={materialDark}
        className="w-full h-full">
        {JSON.stringify(newCode, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};

export default ResponseBody;
