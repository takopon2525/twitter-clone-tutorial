import {
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineUpload,
} from "react-icons/ai";
import TimeAgo from "react-timeago";
import japanStrings from "react-timeago/lib/language-strings/ja";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import React from "react";
import Link from "next/link";

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
    const formatter = buildFormatter(japanStrings);
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5 cursor-pointer hover:bg-slate-100">
      <Link href={`tweet/${tweet.id}`}>
        <div className="flex space-x-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={tweet.image || "https://links.papareact.com/gll"}
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
      </Link>
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
            <AiOutlineHeart
              className="h-5 w-5"
            />
          </div>
          <p> 0</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <div className="p-3 hover:bg-slate-200 hover:rounded-full">
            <AiOutlineUpload className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
