import React, { useContext, useEffect, useState } from "react";
import fetcher from "../../Auth/Axios";
import PeopleCard from "../../Components/PeopleCard/PeopleCard";
import UserContext from "../../Context/UserContext";

const Friends = () => {
  const { accessToken, refreshToken, setAccessToken } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);

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

  const fetchSentFriendRequests = async () => {
    const data = await fetcher.get("api/friendrequests/sent/", accessToken);
    if (data) {
      setSentFriendRequests(data);
    }
  };

  const fetchReceivedFriendRequests = async () => {
    const data = await fetcher.get("api/friendrequests/received/", accessToken);
    if (data) {
      setReceivedFriendRequests(data);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchSentFriendRequests();
    fetchReceivedFriendRequests();
  }, []);

  return (
    <div className="page">
      <h1>Sent Friend Requests</h1>
      <div>
        {sentFriendRequests.map((fr) => {
          return (
            <PeopleCard
              {...{ ...fr, id: fr.accepter }}
              fetchData={fetchSentFriendRequests}
            />
          );
        })}
      </div>
      <h1>Received Friend Requests</h1>
      <div>
        {receivedFriendRequests.map((fr) => {
          return (
            <PeopleCard
              {...{ ...fr, id: fr.requester }}
              fetchData={fetchSentFriendRequests}
            />
          );
        })}
      </div>
      <h1>Friends</h1>
      <div>
        {friends.map((friend) => {
          return (
            <PeopleCard
              {...friend}
              status="friend"
              dataFetcher={fetchFriends}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
