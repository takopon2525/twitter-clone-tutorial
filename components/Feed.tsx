import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_TWEETS } from "../graphql/queris";
import Tweet from "./Tweet";
import { Ring } from "@uiball/loaders";

function Feed() {
  const { data, loading, error } = useQuery(GET_ALL_TWEETS);
  const tweets: Tweet[] = data?.getTweetList;
  if (loading)
    return (
      <div
        className="col-span-7 lg:col-span-5 flex w-full items-center justify-center p-10 text-xl"
        aria-live="polite"
        aria-busy={!tweets}
      >
        <Ring size={50} color="#3899e8" />
      </div>
    );
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