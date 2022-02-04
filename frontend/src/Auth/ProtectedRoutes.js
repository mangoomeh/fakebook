import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Login from "../Pages/Login/Login";

const ProtectedRoutes = () => {
  const userContext = useContext(UserContext);
  const isAuth = userContext.accessToken ? true : false
  return true ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
