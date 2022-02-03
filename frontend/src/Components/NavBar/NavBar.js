import React, { useState, useEffect } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, IconButton } from "@mui/material";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [scrolly, setScrolly] = useState(0);
  const scrollHandler = () => {
    setScrolly(window.scrollY);
  };
 
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return window.removeEventListener("scrol", scrollHandler);
  }, [scrolly]);

  return (
    <div id={scrolly === 0 ? styles.containerOnTop : styles.containerOnTheMove}>
      <div id={styles.logo}>
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="text"
        >
          jabber
        </Button>
      </div>

      <div id={styles.navButtons}>
        <div id={styles.icons}>
          <IconButton color="primary" onClick={() => {
            navigate("/home")
          }}>
            <HomeRoundedIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => {
            navigate("/friends")}}>
            <PeopleRoundedIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => {
            navigate("/profile")}}>
            <AccountCircleRoundedIcon />
          </IconButton>
        </div>
        <Button variant="outlined">logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
