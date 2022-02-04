import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import axios from "axios";
import UserContext from "../../Context/UserContext";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { accessToken } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const endpoint = "http://127.0.0.1:8000/api/users/user";
      const { data } = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div id={styles.page}>
      <div id={styles.container}>
        <div id={styles.left}>
          <AccountCircleRoundedIcon sx={{ fontSize: 150, color: "#283593" }} />
          <h2 id={styles.name}>
            {`${userProfile.name} ${userProfile.surname}`}
          </h2>
          <div>{userProfile.email}</div>
        </div>
        <div id={styles.right}>
          <h3>Friends: </h3>
          <h3>Posts: </h3>
          <h3>Bio: </h3>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
