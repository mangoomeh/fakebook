import React, { useContext, useEffect, useState } from "react";
import fetcher from "../../Auth/Axios";
import UserContext from "../../Context/UserContext";

const Friends = () => {
  const { accessToken, refreshToken, setAccessToken } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
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
    fetchFriends();
  }, []);
  return (
    <div className="page">
      <h1>Friends</h1>
      <div>
        {friends.map((friend) => {
          return <div>{`${friend.name} ${friend.surname}`}</div>;
        })}
      </div>
    </div>
  );
};

export default Friends;
