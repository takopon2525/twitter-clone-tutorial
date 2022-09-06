import { gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
  query MyQuery {
    getTweetList {
      created_at
      id
      image
      text
      username
      commentList {
        id
      }
    }
  }
`;
