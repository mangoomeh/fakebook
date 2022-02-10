import React from "react";
import { IconButton } from "@mui/material";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import styles from "./LikeCommentBar.module.css";

const LikeCommentBar = ({ handleLike, fetchComments, liked_by_user, likes_count }) => {
  return (
    <div className="container" id={styles.container}>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          handleLike();
        }}
      >
        <FavoriteRoundedIcon sx={{ color: liked_by_user ? "red" : "grey" }} />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          fetchComments();
        }}
      >
        <InsertCommentRoundedIcon />
      </IconButton>
      <div id={styles.likesCount}>{`${likes_count} Likes`}</div>
    </div>
  );
};

export default LikeCommentBar;
