import { Button, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import fetcher from "../../Auth/Axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });

  const createAccount = async (e) => {
    e.preventDefault();
    const data = await fetcher.post("api/register/", "", inputs);
    if (data) {
      alert("Sign up success!");
      navigate("/login");
    }
  };

  return (
    <div id={styles.page}>
      <form id={styles.container} onSubmit={createAccount}>
        <h1>Join Us</h1>
        <div className={styles.inputs}>
          <OutlinedInput
            autoFocus
            value={inputs.email}
            onChange={(e) => {
              setInputs({ ...inputs, email: `${e.target.value}` });
            }}
            size="small"
            placeholder="Email"
          />
        </div>
        <div className={styles.inputs}>
          <OutlinedInput
            value={inputs.password}
            onChange={(e) => {
              setInputs({ ...inputs, password: `${e.target.value}` });
            }}
            type="password"
            size="small"
            placeholder="Password"
          />
        </div>
        <div className={styles.inputs}>
          <OutlinedInput
            value={inputs.name}
            onChange={(e) => {
              setInputs({ ...inputs, name: `${e.target.value}` });
            }}
            size="small"
            placeholder="First Name"
          />
        </div>
        <div className={styles.inputs}>
          <OutlinedInput
            value={inputs.surname}
            onChange={(e) => {
              setInputs({ ...inputs, surname: `${e.target.value}` });
            }}
            size="small"
            placeholder="Last Name"
          />
        </div>
        <Button sx={{width: "100%"}} type="submit" variant="contained">
          join
        </Button>
        <p>
          Already a member? <Link to="/">Login</Link>
        </p>
        <div className={styles.inputs}></div>
      </form>
    </div>
  );
};

export default SignUp;
