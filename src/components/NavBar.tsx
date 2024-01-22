import { useNavigate } from "react-router-dom";

import logo from "../assets/dental-logo.svg";
import { Layout } from "antd";
import "../css/layout.css";

const { Header } = Layout;

export function NavBar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Header className="headerStyle fixed flex flex-row top-0 left-0 w-full min-w-[800px] h-32 justify-between items-center px-9 py-11 text-[#181945] text-sm ">
      <div className="flex items-center">
        <a href="/">
          <img src={logo} alt="dental-logo" className="w-auto h-7"></img>
        </a>
      </div>

      <ul className="flex flex-row list-none space-x-4">
        <li>
          <a href="/" className="text-[#181945]">
            About Us
          </a>
        </li>
        <li>
          <a href="/" className="text-[#181945]">
            Our Services
          </a>
        </li>
        <li>
          <a href="/" className="text-[#181945]">
            Contact Us
          </a>
        </li>
      </ul>

      <button className={`rounded-md bg-[#583FBC] text-[#FFFFFF] flex justify-center items-center w-40 h-10`} onClick={handleLogin}>
        Book an appointment
      </button>
    </Header>
  );
}

export default NavBar;
