import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { GET_TWEET_BY_ID } from "../../graphql/queries";
import { Ring } from "@uiball/loaders";
import {
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import Link from "next/link";

function Tweet() {
  const { data: sesson } = useSession();
  const router = useRouter();
  console.log(router.query)
  const { loading, error, data } = useQuery(GET_TWEET_BY_ID, {
    variables: { id: router.query.tweetId },
  });
  const tweet = data?.getTweet;
  if (!tweet || loading)
    return (
      <div
        className="col-span-7 lg:col-span-5 flex w-full justify-center p-10 text-xl"
        aria-live="polite"
        aria-busy={!tweet}
      >
        <Ring size={50} color="#3899e8" />
      </div>
    );
  return (
    <div className="col-span-7 min-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5">
      <Head>
        <title>{router.query.id}</title>
      </Head>
      {tweet && (
        <div>
          <div className="flex items-center p-2">
            <Link href="/">
              <div className="cursor-pointer p-3 hover:bg-gray-100 hover:rounded-full">
                <AiOutlineArrowLeft className="h-6 w-6" />
              </div>
            </Link>
            <h1 className="p-3 text-xl font-bold">ツイート</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tweet;
