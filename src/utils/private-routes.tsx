import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authenticateUser } from "../services/api/api-helper";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
    } else {
      authenticateUser(token)
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.error(e);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
    }
  }, []);

  if (isCheckingAuth) {
    return null; // Or any other loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
