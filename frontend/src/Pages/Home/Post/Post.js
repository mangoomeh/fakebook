import React from "react";
import styles from "./Post.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";

const Post = ({ timestamp, content, name, surname, likes }) => {
  return (
    <div className="card" id={styles.container}>
      <div id={styles.innerLeftContainer}>
        <div id={styles.user}>
          <AccountCircleRoundedIcon sx={{ fontSize: 40, color: "#28359390" }} />
          <div className="title" id={styles.name}>{`${name} ${surname}`}</div>
        </div>
        <div>{content}</div>
        <div id={styles.timestamp}>{new Date(timestamp).toLocaleString()}</div>
      </div>
      <div id={styles.innerRightContainer}>
        <div>{likes}</div>
        <div>
          <IconButton>
            <FavoriteRoundedIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <InsertCommentRoundedIcon />
          </IconButton>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Post;
