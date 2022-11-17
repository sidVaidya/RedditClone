import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import client from "../apollo-client";
import { GET_ALL_POST } from "../graphQL/queries";
import Posts from "./Posts";
import { GET_ALL_POST_BY_TOPIC } from "./../graphQL/queries";

type Props = {
  topic?: string;
};
function Feed({ topic }: Props) {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POST)
    : useQuery(GET_ALL_POST_BY_TOPIC, {
        variables: {
          topic,
        },
      });

  const posts: Posts[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  return (
    <div className="mt-5 space-y-3">
      {posts?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
