import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import {
  HiOutlineBookmark,
  HiOutlineDotsCircleHorizontal,
  HiOutlineHashtag,
} from "react-icons/hi";
import { RiQuillPenLine } from "react-icons/ri";
import { IoListCircleOutline } from "react-icons/io5";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="sticky h-screen top-0 left-0 col-span-2 flex flex-col items-center lg:items-start justify-between overflow-auto">
      <div className="flex flex-col px-4 lg:w-full">
        <img
          src="/twitterLogo.svg"
          alt="twitter logo"
          className="m-3 h-10 w-10"
        />
        <SidebarRow Icon={AiOutlineHome} title="ホーム" />
        <SidebarRow Icon={AiOutlineBell} title="通知" />
        <SidebarRow Icon={AiOutlineMail} title="メッセージ" />
        <SidebarRow Icon={IoListCircleOutline} title="リスト" />
        <SidebarRow
          Icon={AiOutlineUser}
          title={session ? "サインアウト" : "サインイン"}
          onClick={session ? signOut : signIn}
        />
        <SidebarRow Icon={HiOutlineDotsCircleHorizontal} title="もっと見る" />
        {session && (
          <button className="max-fit group mt-4 lg:w-full rounded-full bg-twitter p-4 text-sm font-bold text-white lg:text-base relative">
            <RiQuillPenLine className="h-6 w-6 lg:hidden" />
            <span className="lg:hidden invisible w-[74px] rounded text-[12px] font-bold text-white py-1 bg-slate-400 top-11 -left-3 group-hover:visible opacity-100 absolute text-center">
              ツイートする
            </span>
            <span className="hidden lg:inline">ツイートする</span>
          </button>
        )}
      </div>
      {session && (
        <div className="mt-20 px-4 pb-5 flex items-center lg:w-full">
          <img
            src={session?.user?.image ?? ""}
            className="mt-2 h-14 w-14 rounded-full object-cover"
          />
          <span className="hidden lg:inline font-bold pl-3 text-ellipsis overflow-hidden whitespace-nowrap">
            {session?.user?.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
