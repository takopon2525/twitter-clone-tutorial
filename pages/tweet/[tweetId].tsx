import React, { useState } from "react";
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
import TimeAgo from "react-timeago";
import japanStrings from "react-timeago/lib/language-strings/ja";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import toast from "react-hot-toast";
import Link from "next/link";

function Tweet() {
  const formatter = buildFormatter(japanStrings);
  const { data: sesson } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState<string>("");
  console.log(router.query);
  const { loading, error, data } = useQuery(GET_TWEET_BY_ID, {
    variables: { id: router.query.tweetId },
  });
  const tweet = data?.getTweet;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const notification = toast.loading("ツイートを投稿しています...");
    try {
    } catch (error) {
      toast.error("コメントの投稿に失敗しました。", {
        id: notification,
      });
    }
  };
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
          <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
            <div className="flex space-x-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={tweet.image || ""}
                alt=""
              ></img>
              <div>
                <div className="flex items-center space-x-3">
                  <p className="font-bold">{tweet.username}</p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={tweet.created_at}
                    formatter={formatter}
                  />
                </div>
                <p className="pt-1">{tweet.text}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <div className="p-3 hover:bg-slate-200 hover:rounded-full">
                  <AiOutlineMessage className="h-5 w-5" />
                </div>
                <p>{tweet.commentList.length}</p>
              </div>
              <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <div className="p-3 hover:bg-slate-200 hover:rounded-full">
                  <AiOutlineRetweet className="h-5 w-5" />
                </div>
              </div>
              <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <div className="p-3 hover:bg-slate-200 hover:rounded-full">
                  <AiOutlineHeart className="h-5 w-5" />
                </div>
                <p>0</p>
              </div>
              <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <div className="p-3 hover:bg-slate-200 hover:rounded-full">
                  <AiOutlineUpload className="h-5 w-5" />
                </div>
              </div>
            </div>
            {/* 新規コメントの追加 */}

            <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
                type="text"
                placeholder="返信をツイート"
              />
              <button
                disabled={!comment}
                type="submit"
                className="rounded-full bg-twitter text-white px-5 disabled:text-gray-200 hover:bg-sky-600"
              >
                返信
              </button>
            </form>

            {/* 既にあるコメントを追加 */}
            {tweet.commentList.length > 0 && (
              <div className="my-2 mt-5 max-h-52 space-y-5 overflow-y-auto border-t border-gray-100 p-5">
                {tweet.commentList?.map((comment: any, index: number) => (
                  <div key={comment.id} className="relative flex space-x-2">
                    {/* 最後のhr表示は無しにする */}
                    <hr
                      className={
                        tweet.commentList.length - 1 === index
                          ? "hidden"
                          : "absolute left-5 top-10 h-8 border-x"
                      }
                    />
                    <img
                      src={comment.image}
                      className="mt-2 h-7 w-7 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-3">
                        <p className="mr-1 font-bold">{comment.username}</p>
                        <TimeAgo
                          className="text-sm text-gray-500"
                          date={comment.created_at}
                          formatter={formatter}
                        />
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tweet;
