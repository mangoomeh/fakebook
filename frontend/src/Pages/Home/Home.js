import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  const [postContent, setPostContent] = useState("");
  const [peopleQuery, setPeopleQuery] = useState("");

  const handleNewPost = async (e) => {
    e.preventDefault()
    const endpoint = "http://127.0.0.1:8000/api/users/"
  }

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
        <form>
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
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
              variant="contained"
            >
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
