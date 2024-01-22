import { useState } from "react";
import { registerUser } from "../services/api/api-helper";
import { AxiosError } from "axios";
import { ApiResponse } from "../types";
import { useNavigate } from "react-router-dom";
import RegistrationBanner from "../assets/banner-registration.svg";

export const RegistrationPage = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRedirect = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await registerUser<ApiResponse>(userDetails);

      if (response.status === "success") {
        setSuccess(true);
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
      {/* Background image on the left side */}
      <div className="w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${RegistrationBanner})` }}>
        {/* You can place additional content here if needed */}
      </div>

      {/* Registration form on the right side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12">
        <h2 className="text-2xl font-bold mb-6 ">Sign up</h2>
        <p className="text-sm font- mb-6 ">
          <span>Already have an account? </span>
          <a href="/login" className="text-[#583FBC]">
            Sign in
          </a>
        </p>
        <form className="w-full max-w-lg text-[#583FBC]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              Firstname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Firstname"
              name="firstName"
              onChange={handleChange}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Lastname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Lastname"
              name="lastName"
              onChange={handleChange}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="text"
              placeholder="+6399999999999"
              name="phoneNumber"
              onChange={handleChange}
              required
            />
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
          <div className="flex items-center justify-between">
            <button className="bg-[#583FBC] text-white font-bold py-2 px-4 rounded-full w-full" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
