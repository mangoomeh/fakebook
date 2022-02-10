import React, { useContext, useState } from "react";
import styles from "./Post.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Button, IconButton, OutlinedInput } from "@mui/material";
import fetcher from "../../../Auth/Axios";
import UserContext from "../../../Context/UserContext";
import { v4 as uuidv4 } from "uuid";
import Comment from "./Comment/Comment";
import Header from "./Header/Header";
import LikeCommentBar from "./LikeCommentBar/LikeCommentBar";
import "./Post.css";
import CommentInputBar from "./CommentInputBar/CommentInputBar";

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
  belongs_to_user,
}) => {
  const { accessToken } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [editPostInput, setEditPostInput] = useState("");

  const handleSavePost = async (e) => {
    e.preventDefault();
    const data = await fetcher.post("api/posts/post/updatePost/", accessToken, {
      post_id: id,
      content: editPostInput,
    });
    setEditPost(false);
    dataFetcher();
  };

  const fetchComments = async () => {
    const data = await fetcher.post("api/comments/", accessToken, {
      post: id,
    });
    setComments(data);
  };

  const makeComment = async (e) => {
    e.preventDefault();
    const data = await fetcher.post("api/comments/new/", accessToken, {
      post: id,
      content: commentInput,
    });
    setCommentInput("");
    fetchComments();
  };

  const handleLike = async () => {
    const res = await fetcher.post("api/posts/like/", accessToken, {
      post_id: id,
    });
    dataFetcher();
  };

  return (
    <div className="card">
      <Header {...{ name, surname, timestamp }} />
      {editPost ? (
        <form onSubmit={handleSavePost}>
          <div>
            <OutlinedInput
              value={editPostInput}
              onChange={(e) => {
                setEditPostInput(e.target.value);
              }}
            />
          </div>
          <Button variant="contained" type="submit">
            save
          </Button>
        </form>
      ) : (
        <div className="container" style={{ minHeight: "50px" }}>
          {content}
        </div>
      )}

      <LikeCommentBar {...{ handleLike, fetchComments, liked_by_user, likes_count }} />
      <div>
        {comments.map((comment) => {
          return <Comment {...comment} />;
        })}
      </div>

      <CommentInputBar {...{ makeComment, setCommentInput, commentInput }} />
    </div>
  );
};

export default Post;
