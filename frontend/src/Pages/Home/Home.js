import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import styles from "./Home.module.css";
import fetcher from "../../Auth/Auth";
import UserContext from "../../Context/UserContext";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [peopleQuery, setPeopleQuery] = useState("");

  const { accessToken, setAccessToken, refreshToken } = useContext(UserContext);

  const newPost = async (accessToken) => {
    await fetcher.post(
      "api/posts/new/",
      accessToken,
      { content: postContent },
      (data) => {
        console.log(data);
      }
    );
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    const verifiedToken = await fetcher.verifyAndRefresh(
      accessToken,
      refreshToken
    );
    if (verifiedToken !== accessToken) {
      setAccessToken(verifiedToken);
    }
    newPost(verifiedToken);
  };

  return (
    <div id={styles.page}>
      <form>
        <OutlinedInput
          onChange={(e) => {
            setPeopleQuery(e.target.value);
          }}
          value={peopleQuery}
          size="small"
          placeholder="Find People"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </form>
      <div>
        <form onSubmit={handleNewPost}>
          <OutlinedInput
            multiline
            rows={4}
            placeholder="What's on your mind?"
            sx={{ width: 600 }}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
            value={postContent}
          />
          <div>
            <Button type="submit" variant="contained">
              post
            </Button>
          </div>
        </form>
      </div>

      <div>
        <h1>Posts</h1>
      </div>
    </div>
  );
};

export default Home;
