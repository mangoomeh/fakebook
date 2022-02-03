import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div id={styles.page}>
      <FormControl>
        <OutlinedInput
          size="small"
          placeholder="Find People"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <div>
        <FormControl>
          <OutlinedInput
            multiline
            rows={4}
            placeholder="What's on your mind?"
          />
          <Button variant="contained">post</Button>
        </FormControl>
      </div>

      <div>
        <h1>Posts</h1>
      </div>
    </div>
  );
};

export default Home;
