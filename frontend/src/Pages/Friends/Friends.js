import React, { useContext, useEffect, useState } from "react";
import fetcher from "../../Auth/Axios";
import PeopleCard from "../../Components/PeopleCard/PeopleCard";
import UserContext from "../../Context/UserContext";

const Friends = () => {
  const { accessToken, refreshToken, setAccessToken } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const verifiedToken = await fetcher.verifyAndRefresh(
      accessToken,
      refreshToken
    );
    const data = await fetcher.get("api/friends/", verifiedToken);
    setFriends(data);
    if (accessToken !== verifiedToken) {
      setAccessToken(verifiedToken);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="page">
      <h1>Friends</h1>
      <div>
        {friends.map((friend) => {
          console.log(friend)
          return <PeopleCard {...friend} status="friend" dataFetcher={fetchFriends} />;
        })}
      </div>
    </div>
  );
};

export default Friends;
