import { NavBar } from "./NavBar";
import { Layout } from "antd";
const { Content } = Layout;

import "../css/layout.css";
import FooterComponent from "./footer";

const App = () => {
  return (
    <Layout className="layoutStyle flex flex-col min-h-screen bg-white text-[#181945]">
      <NavBar />
      <Content className="contentStyle flex flex-col flex-grow p-8 bg-no-repeat  bg-center"></Content>
      <FooterComponent />
    </Layout>
  );
};

export default App;
