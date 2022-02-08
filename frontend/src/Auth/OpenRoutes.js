import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Home from "../Pages/Home/Home";

const OpenRoutes = () => {
  const userContext = useContext(UserContext);
  const isAuth = userContext.accessToken ? true : false
  return isAuth ? <Home /> : <Outlet />;
};

export default OpenRoutes;
