import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Home from "../Pages/Home/Home";

const OpenRoutes = () => {
  const userContext = useContext(UserContext);
  const isAuth = userContext.accessToken ? true : false;
  return isAuth ? (
    <div className="page">
      <h1>You are already logged in.</h1>
      <Link to="/home">Continue</Link>
    </div>
  ) : (
    <Outlet />
  );
};

export default OpenRoutes;
