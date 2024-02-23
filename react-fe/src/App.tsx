import Layout from "./components/Layout";
import JsonBody from "./components/sections/JsonBody";
import UrlHolder from "./components/sections/UrlHolder";

const App = () => {
  return (
    <Layout className="">
      <UrlHolder />
      {/* <ResponseBody /> */}
      <JsonBody />
    </Layout>
  );
};

export default App;
