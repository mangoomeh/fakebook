import React, { useContext, useEffect, useState } from "react";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import styles from "./Home.module.css";
import fetcher from "../../Auth/Axios";
import UserContext from "../../Context/UserContext";
import Post from "./Post/Post";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [postsToBeDisplayed, setPostsToBeDisplayed] = useState([]);
  const { accessToken } = useContext(UserContext);

  const fetchPosts = async () => {
    const data = await fetcher.get("api/posts/", accessToken);
    setPostsToBeDisplayed(data);
  };

  const newPost = async () => {
    await fetcher.post("api/posts/new/", accessToken, { content: postContent });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
    console.log("i fired once")
  }, []);

  return (
    <div className="page">
      <div id={styles.postContainer}>
        <form onSubmit={newPost}>
          <OutlinedInput
            multiline
            rows={4}
            placeholder="What's on your mind?"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
            value={postContent}
          />
          <div id={styles.postButton}>
            <Button type="submit" variant="contained">
              post
            </Button>
          </div>
        </form>
      </div>

      <div>
        <h1>Posts</h1>
        {postsToBeDisplayed.map((elem) => {
          return <Post {...elem} dataFetcher={fetchPosts} />;
        })}
      </div>
    </div>
  );
};

export default Home;
