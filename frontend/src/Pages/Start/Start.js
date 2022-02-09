import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Start.module.css";

const Start = () => {
  const navigate = useNavigate();
  return (
    <div id={styles.page}>
      <div id={styles.container}>
        <h1>Welcome to fakebook</h1>
        <div id={styles.buttons}>
          <div className={styles.button}>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/login");
              }}
            >
              sign in
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
