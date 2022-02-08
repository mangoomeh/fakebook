import React, { useContext, useState } from "react";
import styles from "./Post.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";
import fetcher from "../../../Auth/Axios";
import UserContext from "../../../Context/UserContext";

const Post = ({
  id,
  timestamp,
  content,
  name,
  surname,
  likes,
  likes_count,
  liked_by_user,
  dataFetcher,
}) => {
  const { accessToken } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    if (comments.length === 0) {
      const data = await fetcher.post("api/comments/", accessToken, {
        post: id,
      });
      if (data) {
        setComments(data);
      }
    } else {
      setComments([])
    }
  };

  const handleLike = async () => {
    const res = await fetcher.post("api/posts/like/", accessToken, {
      post_id: id,
    });
  };

  return (
    <div className="card" id={styles.container}>
      <div id={styles.topContainer}>
        <div id={styles.innerLeftContainer}>
          <div id={styles.user}>
            <AccountCircleRoundedIcon
              sx={{ fontSize: 40, color: "#28359390" }}
            />
            <div id={styles.titleAndTimestamp}>
              <div
                className="title"
                id={styles.name}
              >{`${name} ${surname}`}</div>
              <div className="timestamp">
                {new Date(timestamp).toLocaleString()}
              </div>
            </div>
          </div>
          <div>{content}</div>
        </div>
        <div id={styles.innerRightContainer}>
          <div>{likes_count}</div>
          <div>
            <IconButton
              onClick={() => {
                handleLike();
                dataFetcher();
              }}
            >
              <FavoriteRoundedIcon
                sx={{ color: liked_by_user ? "red" : "grey" }}
              />
            </IconButton>
          </div>
          <div>
            <IconButton
              onClick={() => {
                fetchComments();
              }}
            >
              <InsertCommentRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div id={styles.commentsContainer}>
        {comments.map((comment) => {
          return <div>{comment.content}</div>;
        })}
      </div>
    </div>
  );
};

export default Post;
