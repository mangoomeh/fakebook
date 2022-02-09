import { Button, OutlinedInput } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import UserContext from "../../Context/UserContext";
import fetcher from "../../Auth/Axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAccessToken, setRefreshToken, accessToken } =
    useContext(UserContext);

  const navigate = useNavigate();

  const getToken = async (e) => {
    e.preventDefault();
    const { access, refresh } = await fetcher.post("auth/token/", "", {
      email,
      password,
    });
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  return (
    <div id={styles.page}>
      <form id={styles.container} onSubmit={getToken}>
        <h1>fakebook</h1>
        <div className={styles.inputs}>
          <OutlinedInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            size="small"
            placeholder="Email"
          />
        </div>
        <div className={styles.inputs}>
          <OutlinedInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            size="small"
            placeholder="Password"
          />
        </div>
        <Button type="submit" variant="contained">
          continue
        </Button>
        <p>
          Not a member? <Link to="/signup">Join</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
