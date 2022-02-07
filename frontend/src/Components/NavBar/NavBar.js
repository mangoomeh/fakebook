import React, { useState, useEffect, useContext } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, IconButton } from "@mui/material";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import SearchIcon from '@mui/icons-material/Search';

const NavBar = () => {
  const [scrolly, setScrolly] = useState(0);
  const scrollHandler = () => {
    setScrolly(window.scrollY);
  };

  const navigate = useNavigate();

  const { accessToken, setAccessToken, setRefreshToken } =
    useContext(UserContext);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return window.removeEventListener("scroll", scrollHandler);
  }, [scrolly]);

  const handleLogOut = () => {
    setAccessToken("");
    setRefreshToken("");
    navigate("/");
  };

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
      {accessToken === "" ? (
        <></>
      ) : (
        <div id={styles.navButtons}>
          <div id={styles.icons}>
            <IconButton
              color="primary"
              onClick={() => {
                navigate("/people");
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                navigate("/home");
              }}
            >
              <HomeRoundedIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => {
                navigate("/friends");
              }}
            >
              <PeopleRoundedIcon />
            </IconButton>
            <IconButton
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
