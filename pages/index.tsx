import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Postbox from "../components/Postbox";
import Subreddit from "../components/Subreddit";
import { GET_SUBREDDIT_WITH_LIMITS } from "../graphQL/queries";

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMITS, {
    variables: {
      limits: 10,
    },
  });

  const subreddit: subreddit[] = data?.getSubredditWithLimits;

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* post box */}
      <Postbox />
      <div className="flex py-7">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md p-4 pb-3 font-bold mb-1">Top Communities</p>
          <div>
            {subreddit?.map((item, i) => (
              <div>
                <Subreddit topic={item.topic} index={i} key={item.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
