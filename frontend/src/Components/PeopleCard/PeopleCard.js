import React, { useContext } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import fetcher from "../../Auth/Axios";
import UserContext from "../../Context/UserContext";
import styles from "./PeopleCard.module.css";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const PeopleCard = ({ name, surname, status, dataFetcher, id }) => {
  const { accessToken } = useContext(UserContext);

  async function sendFriendRequest(friend_id) {
    const res = await fetcher.post("api/addfriend/", accessToken, {
      accepter: friend_id,
    });
  }

  async function acceptFriendRequest(friend_id) {
    console.log(friend_id);
    const res = await fetcher.post("api/acceptfriend/", accessToken, {
      friend: friend_id,
    });
  }

  async function deleteFriend(friend_id) {
    const res = await fetcher.delete("api/deletefriend/", accessToken, {
      friend: friend_id,
    });
  }

  let icon;
  let handleIconClick = () => {};
  switch (status) {
    case null:
      icon = <AddIcon />;
      handleIconClick = () => {
        sendFriendRequest(id);
      };
      break;
    case "friend":
      icon = <ClearIcon sx={{ fontSize: 25, color: "rgb(220, 50, 50)" }} />;
      handleIconClick = () => {
        deleteFriend(id);
      };
      break;
    case "requested":
      icon = <AccessTimeIcon />;
      break;
    case "pending accept":
      icon = <DoneRoundedIcon />;
      handleIconClick = () => {
        acceptFriendRequest(id);
      };
      break;
    case "me":
      icon = <div style={{ fontSize: "18px" }}>you</div>;
      break;
    default:
      icon = <div></div>;
  }
  return (
    <div className="card" id={styles.container}>
      <div id={styles.user}>
        <AccountCircleRoundedIcon sx={{ fontSize: 40, color: "#28359390" }} />
        <div className="title" id={styles.title}>{`${name} ${surname}`}</div>
      </div>
      <div
        onClick={() => {
          handleIconClick();
          if (dataFetcher) {
            dataFetcher();
          }
        }}
      >
        <IconButton>{icon}</IconButton>
      </div>
    </div>
  );
};

export default PeopleCard;
