import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import UserContext from "../../Context/UserContext";
import fetcher from "../../Auth/Axios";
import { Button, OutlinedInput } from "@mui/material";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { accessToken } = useContext(UserContext);
  const [editBio, setEditBio] = useState(false);
  const [bioInput, setBioInput] = useState("");

  const fetchProfile = async () => {
    const data = await fetcher.get("api/users/user", accessToken);
    setUserProfile(data);
  };

  const handleSaveBio = async (e) => {
    e.preventDefault();
    const res = await fetcher.post("api/users/user/updateBio/", accessToken, {
      content: bioInput,
    });
    setEditBio(false);
    fetchProfile();
  };

  useEffect(() => {
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
          <h3>
            Friends: <span id={styles.data}>{userProfile.friends_count}</span>
          </h3>
          <h3>
            Posts: <span id={styles.data}>{userProfile.posts_count}</span>
          </h3>
          <h3>Bio: </h3>
          {editBio ? (
            <div>
              <form onSubmit={handleSaveBio}>
                <div>
                  <OutlinedInput
                    sx={{ width: "300px" }}
                    multiline
                    rows={3}
                    value={bioInput}
                    onChange={(e) => {
                      setBioInput(e.target.value);
                    }}
                  />
                </div>
                <br />
                <Button variant="contained" type="Submit">
                  save
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <div>{userProfile.bio}</div>
              <br />
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  setEditBio(true);
                  setBioInput(userProfile.bio);
                }}
              >
                edit bio
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
