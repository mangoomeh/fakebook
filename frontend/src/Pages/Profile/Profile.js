import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import UserContext from "../../Context/UserContext";
import fetcher from "../../Auth/Axios";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { accessToken, refreshToken, setAccessToken } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const verifiedToken = await fetcher.verifyAndRefresh(
        accessToken,
        refreshToken
      );
      const data = await fetcher.get("api/users/user", verifiedToken);
      setUserProfile(data);
      if (accessToken !== verifiedToken) {
        setAccessToken(verifiedToken);
      }
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
          <h3>Friends: {userProfile.friends_count} </h3>
          <h3>Posts: {userProfile.posts_count} </h3>
          <h3>Bio: </h3>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
