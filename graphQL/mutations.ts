import { gql } from "@apollo/client";
export const ADD_POST = gql`
  mutation Mymutations(
    $body: String!
    $image: String!
    $title: String!
    $subreddit_id: ID!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      title: $title
      subreddit_id: $subreddit_id
      username: $username
    ) {
      body
      id
      username
      title
      image
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation myMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mymutations($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      created_at
      post_id
      username
      text
      id
    }
  }
`;

export const ADD_VOTE = gql`
  mutation Mymutations($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      created_at
      post_id
      username
      id
    }
  }
`;
