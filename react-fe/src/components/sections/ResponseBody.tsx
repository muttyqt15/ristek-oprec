import { JsonCode } from "./RequestBody";

const ResponseBody = ({ newCode }: {newCode: JsonCode | string}) => {
  return (
    <div className="max-w-[550px] w-full border-none rounded-xl h-[200px] bg-slate-900 text-white overflow-x-auto">
      <pre className="p-2 overflow-y-auto text-green-300 break-all whitespace-pre-wrap">
        <p>{JSON.stringify(newCode, null, 2)}</p>
      </pre>
    </div>
  );
};

export default ResponseBody;
