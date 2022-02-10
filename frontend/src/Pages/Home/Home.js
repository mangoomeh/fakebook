import React, { useContext, useEffect, useState } from "react";
import { Button, OutlinedInput } from "@mui/material";
import styles from "./Home.module.css";
import fetcher from "../../Auth/Axios";
import UserContext from "../../Context/UserContext";
import Post from "./Post/Post";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [postsToBeDisplayed, setPostsToBeDisplayed] = useState([]);
  const { accessToken } = useContext(UserContext);

  const fetchPosts = async () => {
    const data = await fetcher.get("api/posts/", accessToken);
    if (data) {
      setPostsToBeDisplayed(data);
    }
  };

  const newPost = async () => {
    await fetcher.post("api/posts/new/", accessToken, { content: postContent });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="page">
      <div id={styles.postContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newPost();
            setPostContent("")
          }}
        >
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
          return <Post key={uuidv4()} {...elem} dataFetcher={fetchPosts} />;
        })}
      </div>
    </div>
  );
};

export default Home;
