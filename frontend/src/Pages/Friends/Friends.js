import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetcher from "../../Auth/Axios";
import PeopleCard from "../../Components/PeopleCard/PeopleCard";
import UserContext from "../../Context/UserContext";

const Friends = () => {
  const { accessToken } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);

  const fetchFriends = async () => {
    const data = await fetcher.get("api/friends/", accessToken);
    setFriends(data);
  };

  const fetchSentFriendRequests = async () => {
    const data = await fetcher.get("api/friendrequests/sent/", accessToken);
    setSentFriendRequests(data);
  };

  const fetchReceivedFriendRequests = async () => {
    const data = await fetcher.get("api/friendrequests/received/", accessToken);
    setReceivedFriendRequests(data);
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
      {friends.length === 0 && <Link to="/people">Find people now</Link>}
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
