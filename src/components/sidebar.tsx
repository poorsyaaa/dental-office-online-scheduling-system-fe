import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InitialsAvatar from "react-initials-avatar";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import Logo from "../assets/dental-logo.svg";
import { getUserDetails } from "../services/api/api-helper";
// import { AxiosError } from "axios";

interface UserResponse {
  data: UserInfo;
}

interface UserInfo {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState<UserInfo>();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = localStorage.getItem("userId") as string;
        const details = await getUserDetails<UserResponse>(userId);
        if (details) {
          setUserDetails(details.data);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex flex-col h-full ">
      <img src={Logo} alt="User profile" className="h-[50px] w-[150px] ml-6 mt-2" />
      <div className="flex flex-col items-center h-full justify-between">
        <div className="flex flex-col mt-4 items-center h-full text-[#181945]">
          <InitialsAvatar name={`${userDetails?.firstName} ${userDetails?.lastName}`} />
          <p className="text-sm text-[#181945]">{userDetails?.userName}</p>
          <h1 className="text-2xl font-bold text-[#181945]">{`${userDetails?.firstName} ${userDetails?.lastName}`}</h1> {/* Corrected class for bold font */}
          <p className="text-sm text-[#181945]">{userDetails?.email}</p>
          <p className="text-sm text-[#181945]">{userDetails?.phoneNumber}</p>
        </div>
        <button className="bg-[#583FBC] rounded-full w-24 text-white text-sm font-normal px-4 py-1 rounded shadow flex items-center justify-center mb-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
