import React, { useState } from 'react';
import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const People = () => {
  const [query, setQuery] = useState("");
  return (
    <div style={{marginTop: "60px"}}>
      <form>
        <OutlinedInput
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          size="small"
          placeholder="Find People"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </form>
      <h1>People</h1>
      <div>

      </div>
    </div>
  );
};

export default People;