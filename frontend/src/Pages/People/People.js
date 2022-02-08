import React, { useContext, useState } from "react";
import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import fetcher from "../../Auth/Axios";
import UserContext from "../../Context/UserContext";
import PeopleCard from "../../Components/PeopleCard/PeopleCard";

const People = () => {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const { accessToken } = useContext(UserContext);
  
  const fetchPeople = async (e) => {
    e.preventDefault();
    const people = await fetcher.get(`api/people/?query=${query}`, accessToken);
    if (!people.msg) {
      setPeople(people);
    }
  };

  return (
    <div className="page">
      <form onSubmit={fetchPeople}>
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
        {people.map((person) => {
          return <PeopleCard {...person} dataFetcher={fetchPeople}/>;
        })}
      </div>
    </div>
  );
};

export default People;
