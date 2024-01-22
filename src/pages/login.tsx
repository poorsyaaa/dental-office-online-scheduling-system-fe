import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api/api-helper";
import { ApiResponse } from "../types";
import { AxiosError } from "axios";

import BannerLogin from "../assets/banner-login.svg";
export const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRedirect = () => {
    navigate("/dashboard"); // Use the navigate function to redirect
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const loginResponse = await login<ApiResponse>(userDetails);
      if (loginResponse.status === "success") {
        setSuccess(true);
        localStorage.setItem("accessToken", loginResponse.data.accessToken);
        localStorage.setItem("userId", loginResponse.data.userId);
        handleRedirect();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setSuccess(false);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen text-[#181945]">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${BannerLogin})` }} />
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12">
        <h1 className="text-2xl font-medium text-[#583FBC]">Login</h1>
        <p className="text-sm font- mb-6 ">
          <span>Don't have an account yet? </span>
          <a href="/registration" className="text-[#583FBC]">
            Sign up
          </a>
        </p>
        <form className="flex flex-col w-full max-w-lg text-[#583FBC]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              type="text"
              placeholder="Username"
              name="userName"
              onChange={handleChange}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          {!success && <p className="text-red-500 text-sm text-semibold">{errorMessage}</p>}
          <div className="flex items-center mt-2 w-full">
            <button className="bg-[#583FBC] text-white font-bold py-2 px-4 rounded-full w-full" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
