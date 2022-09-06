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