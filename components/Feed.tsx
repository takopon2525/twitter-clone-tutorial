import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_TWEETS } from "../graphql/queris";
import Tweet from "./Tweet";

function Feed() {
  const { data, loading, error } = useQuery(GET_ALL_TWEETS);
  const tweets: Tweet[] = data?.getTweetList;
  return (
    <div>
      {/* tweet post box */}
      <div>This is tweet post component</div>
      {/* feed component */}
      <div>
        {tweets?.map((tweet) => (
          <Tweet tweet={tweet} key={tweet.id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
