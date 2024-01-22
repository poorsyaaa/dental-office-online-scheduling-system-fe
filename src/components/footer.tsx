import { Layout } from "antd";
const { Footer } = Layout;
import Sns from "../assets/social-medias.svg";
import "../css/layout.css";

const FooterComponent = () => {
  return (
    <Footer className="footerStyle flex flex-col items-center justify-center bg-[#041434] h-32 py-8 px-8">
      {/* <img src={Logo} alt="dental-logo-footer" className="h-[45px] w-[90px] mb-2"></img> */}
      <p className="text-[#FFFFFF99] text-center">©Dentalist. All Right Reserved</p>
      <p className="text-[#FFFFFF99] mt-2">Follow us on</p>
      <img src={Sns} alt="dental-logo-footer" className="h-[45px] w-[90px] mt-2"></img>
    </Footer>
  );
};

export default FooterComponent;
