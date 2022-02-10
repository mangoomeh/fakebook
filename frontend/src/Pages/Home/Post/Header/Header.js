import React from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./Header.module.css";

const Header = ({ name, surname, timestamp }) => {
  return (
    <div className="container" id={styles.container}>
      <div id={styles.avatar}>
        <AccountCircleRoundedIcon sx={{ fontSize: 40, color: "#28359390" }} />
      </div>
      <div>
        <div className="title">{`${name} ${surname}`}</div>
        <div className="timestamp">{new Date(timestamp).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Header;
