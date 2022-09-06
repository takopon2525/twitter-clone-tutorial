import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_TWEETS } from "../graphql/queris";

function Feed() {
  const { data, loading, error } = useQuery(GET_ALL_TWEETS);
  console.log(data);
  return (
    <div>
      {/* tweet post box */}
      <div>This is tweet post component</div>
      {/* feed component */}
      <div>This is tweet component</div>
    </div>
  );
}

export default Feed;
