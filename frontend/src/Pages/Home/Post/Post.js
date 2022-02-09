import React, { useContext, useEffect, useState } from "react";
import styles from "./Post.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton, OutlinedInput } from "@mui/material";
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
  comments_count,
}) => {
  const { accessToken } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const fetchComments = async () => {
    const data = await fetcher.post("api/comments/", accessToken, {
      post: id,
    });
    if (data) {
      setComments(data);
    } else {
      setComments([]);
    }
  };

  const makeComment = async () => {
    const data = await fetcher.post("api/comments/new/", accessToken, {
      post: id,
      content: commentInput,
    });
    fetchComments();
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
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleLike();
              dataFetcher();
            }}
          >
            <FavoriteRoundedIcon
              sx={{ color: liked_by_user ? "red" : "grey" }}
            />
          </IconButton>
          <div>{comments_count}</div>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              fetchComments();
            }}
          >
            <InsertCommentRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div id={styles.commentsContainer}>
        <div>
          <div className="title">Comments:</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              makeComment();
            }}
          >
            <input id={styles.commentInput}
            placeholder="Add a comment"
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
          </form>
        </div>
        {comments.map((comment) => {
          return (
            <div className={styles.comment}>
              
              <div>
                <div
                  className="title"
                  id={styles.commentInfo}
                >{`${comment.user_name} ${comment.user_surname}`}</div>
                <div className="timestamp">{new Date(comment.timestamp).toLocaleString()}</div>
              </div>

              <div id={styles.commentInfo}>{comment.content}</div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
