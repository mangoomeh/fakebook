import React, { useState, useEffect, useContext } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, IconButton } from "@mui/material";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken, setRefreshToken } =
    useContext(UserContext);

  const handleLogOut = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/");
  };

  return (
    <div id={styles.containerOnTop}>
      <div id={styles.logo}>
        <div
          id={styles.logoText}
          onClick={() => {
            navigate("/");
          }}
          variant="text"
        >
          fakebook
        </div>
      </div>
      {accessToken === "" ? (
        <></>
      ) : (
        <div id={styles.navButtons}>
          <div id={styles.icons}>
            <IconButton
              sx={{
                border: "1px solid rgba(139, 139, 139, 0.2)",
                borderRadius: "10px",
              }}
              color="primary"
              onClick={() => {
                navigate("/people");
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid rgba(139, 139, 139, 0.2)",
                borderRadius: "10px",
              }}
              color="primary"
              onClick={() => {
                navigate("/home");
              }}
            >
              <HomeRoundedIcon />
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid rgba(139, 139, 139, 0.2)",
                borderRadius: "10px",
              }}
              color="primary"
              onClick={() => {
                navigate("/friends");
              }}
            >
              <PeopleRoundedIcon />
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid rgba(139, 139, 139, 0.2)",
                borderRadius: "10px",
              }}
              color="primary"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <AccountCircleRoundedIcon />
            </IconButton>
          </div>
          <Button variant="outlined" onClick={handleLogOut}>
            logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
