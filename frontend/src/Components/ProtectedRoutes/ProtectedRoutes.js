import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Login from "../../Pages/Login/Login";

const ProtectedRoutes = () => {
  const userContext = useContext(UserContext);
  return userContext.accessToken ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
