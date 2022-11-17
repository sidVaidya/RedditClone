import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import Postbox from "../../components/Postbox";

function subredditPage() {
  const {
    query: { topic },
  } = useRouter();
  return (
    <div className="h-24 bg-red-400 p-8">
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic} large={true} />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">{`Welcome to the ${topic}`}</h1>
            <p className="text-sm text-gray-400">{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl mt-5 pb-10">
        <Postbox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  );
}

export default subredditPage;
