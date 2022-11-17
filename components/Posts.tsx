import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  GifIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import { HiChatAlt } from "react-icons/hi";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_VOTE } from "../graphQL/mutations";
import { GET_ALL_POST } from "../graphQL/queries";
import { GET_ALL_VOTES_BY_POST_ID } from "./../graphQL/queries";
type Props = {
  post: Posts;
};

function Posts({ post }: Props) {
  const [Vote, setVote] = useState(null) as any;
  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      id: post?.id,
    },
  });
  const [ADVOTE] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVoteUsingVote_post_id_fkey"],
  });

  useEffect(() => {
    const votes: Vote[] = data?.getVoteUsingVote_post_id_fkey;
    const vote = votes?.filter(
      (vote: any) => vote.username == session?.user?.name
    );
    setVote(vote?.splice(-1)[0]?.upvote);
  }, [data]);

  if (!post) {
    return (
      <div className="flex w-full justify-center items-center p-10 text-xl">
        <Jelly size={50} color="red" />
      </div>
    );
  }

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("Please sign in to vote!");
      return;
    }
    if (Vote && isUpvote) return;
    if (!Vote && !isUpvote) return;
    try {
      const { data: insertVote } = await ADVOTE({
        variables: {
          post_id: post.id,
          username: session?.user?.name,
          upvote: isUpvote,
        },
      });
    } catch (error) {}
  };

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVoteUsingVote_post_id_fkey;

    const displayNumber = votes?.reduce(
      (total, vote) => (vote?.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length == 0) return 0;
    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }
    return displayNumber;
  };

  return (
    <Link href={`/post/${post.id}`}>
      <div className=" mt-4 flex cursor-pointer rounded-md border border-gray-300 bg-white hover:border shadow-sm hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`h-8 w-8 p-1 rounded hover:bg-gray-500 hover:text-red-400 ${
              Vote && "text-blue-800"
            }`}
          />
          <p className="font-bold text-xs text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`h-8 w-8 p-1 rounded hover:bg-gray-500 hover:text-red-400 ${
              !Vote && "text-red-800"
            }`}
          />
        </div>

        <div className="p-3 pb-1">
          {/* header */}
          <div className="flex items-center">
            <Avatar seed={post.subreddit?.topic} />
            <Link href={`/subreddit/${post.subreddit.topic}`}>
              <p className="font-bold hover:text-blue-400 hover:underline text-gray-400">
                <span>r/{post.subreddit?.topic}</span> -{">"} Posted by u/
                {post.username} <TimeAgo date={post?.created_at} />
              </p>
            </Link>
          </div>
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          <img src={post?.image} alt="" />
          <div className="flex space-x-4 text-gray-400">
            <div className="flex items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
              <HiChatAlt className="h-6 w-6" />
              <p>{post.comment?.length || 0} comments</p>
            </div>
            <div className="flex space-x-1 items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
              <GifIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="flex space-x-1 items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="flex space-x-1 items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Posts;
