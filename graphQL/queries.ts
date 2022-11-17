import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query getSubredditByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_POST = gql`
  query getallPost {
    getPostList {
      id
      created_at
      title
      body
      image
      username
      comment {
        username
        text
      }
      subreddit {
        id
        topic
      }
    }
  }
`;

export const GET_ALL_POST_BY_TOPIC = gql`
  query getallPostbyTopic($topic: String!) {
    getPostListByTopic(topic: $topic) {
      id
      created_at
      title
      body
      image
      username
      comment {
        username
        text
      }
      subreddit {
        id
        topic
      }
    }
  }
`;

export const GET_ALL_POST_BY_POST_ID = gql`
  query getPostByPostId($id: String!) {
    getPostListByPostId(id: $id) {
      id
      created_at
      title
      body
      image
      username
      comment {
        username
        text
      }
      subreddit {
        id
        topic
      }
    }
  }
`;
