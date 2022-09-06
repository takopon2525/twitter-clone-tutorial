import { gql } from "@apollo/client";

export const ADD_TWEET = gql`
  mutation MyMutation($image: String!, $text: String!, $username: String!) {
    insertTweet(text: $text, username: $username, image: $image) {
      created_at
      id
      image
      text
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation(
    $text: String!
    $tweet_id: ID!
    $username: String!
    $image: String!
  ) {
    insertComment(
      text: $text
      tweet_id: $tweet_id
      username: $username
      image: $image
    ) {
      created_at
      id
      image
      text
      tweet_id
      username
    }
  }
`;