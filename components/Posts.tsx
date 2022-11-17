import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, GifIcon, ShareIcon } from "@heroicons/react/24/solid";
import React from "react";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import { HiChatAlt } from "react-icons/hi";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
type Props = {
  post: Posts;
};

function Posts({ post }: Props) {

if(!post) {
    return (
        <div className="flex w-full justify-center items-center p-10 text-xl">
        <Jelly size={50} color='red'/>
        </div>
    )
}
  return (
    <Link href={`/post/${post.id}`}>
    <div className=" mt-4 flex cursor-pointer rounded-md border border-gray-300 bg-white hover:border shadow-sm hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon className="h-6 w-6 p-1 rounded hover:bg-gray-500 hover:text-red-400" />
        <p className="font-bold text-xs text-black">0</p>
        <ArrowDownIcon className="h-6 w-6 p-1 rounded hover:bg-gray-500 hover:text-red-400" />
      </div>

      <div className="p-3 pb-1">
        {/* header */}
        <div className="flex items-center">
          <Avatar seed={post.subreddit?.topic} />
          <Link href={`/subreddit/${post.subreddit.topic}`}>
          <p className="font-bold hover:text-blue-400 hover:underline text-gray-400">
            <span>r/{post.subreddit?.topic}</span> -> Posted by u/
            {post.username} <TimeAgo date={post?.created_at}/>
          </p>
          </Link>
        </div>
        <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">
                {post.body}
            </p>
        </div>
        <img src={post?.image} alt=""/>
        <div className="flex space-x-4 text-gray-400">
            <div className="flex items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
                <HiChatAlt className="h-6 w-6"/>
                <p>{post.comment?.length || 0} comments</p>
            </div>
            <div className="flex space-x-1 items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
                <GifIcon className="h-6 w-6"/>
                <p className="hidden sm:inline">Award</p>
            </div>
            <div className="flex space-x-1 items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
                <ShareIcon className="h-6 w-6"/>
                <p className="hidden sm:inline">Share</p>
            </div>
            <div className="flex space-x-1 items-center text-sm font-semibold p-2 hover:bg-gray-100 rounded-r-sm cursor-pointer">
                <BookmarkIcon className="h-6 w-6"/>
                <p className="hidden sm:inline">Save</p>
            </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Posts;
