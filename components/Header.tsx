import Image from "next/image";
import React from "react";
import {
  BellIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  HomeIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineSearch } from "react-icons/ai";
import {
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiVideoCamera,
  HiOutlineChatAlt2,
  HiOutlineBell,
  HiMenu,
  HiPlus,
  HiSpeakerphone,
} from "react-icons/hi";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex px-4 py-2 sticky top-0 bg-white items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            src={
              "https://banner2.cleanpng.com/20180605/tgs/kisspng-reddit-logo-computer-icons-reddit-alien-5b16a57b633225.8204472115282108114063.jpg"
            }
            layout="fill"
            objectFit="contain"
            alt={""}
          />
        </Link>
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form
        className="flex flex-1 items-center space-x-2 border border-gray-200
      rounded-sm bg-gray-100 px-3 py-1"
      >
        <AiOutlineSearch className="h-6 w-6 text-gray-400" />
        <input className="outline-none" placeholder="Search" type={"text"} />
        <button hidden type="submit" />
      </form>

      <div className="flex text-gray-500 space-x-2 mx-5 hidden lg:inline-flex">
        <HiOutlineSparkles className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
        <GlobeAltIcon className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
        <VideoCameraIcon className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
        <hr className="h-10 border border-gray-100" />
        <HiOutlineChatAlt2 className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
        <BellIcon className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
        <PlusIcon className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
        <HiSpeakerphone className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
      </div>

      <div className="ml-5 items-center flex lg:hidden">
        <HiMenu className="h-10 w-6 cursor-pointer lg:w-9 rounded-sm lg:p-1 lg:hover:bg-gray-100" />
      </div>
      {session ? (
        <>
          <div
            onClick={() => signOut()}
            className="hidden cursor-pointer lg:flex items-center p-2 border border-gray-100"
          >
            <div className="h-5 w-5 flex relative flex-shrink-0">
              <Image
                layout="fill"
                src={"https://cdn-icons-png.flaticon.com/512/52/52053.png"}
                alt={""}
              />
            </div>
            <div className="flex-1 text-xs ml-2">
              <p className="truncate">{session?.user?.name}</p>
              <p className="text-gray-400">Sign out</p>
            </div>
            <ChevronDownIcon className="h-5 text-gray-500 flex-shrink-0 m-1" />
          </div>
        </>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer lg:flex items-center p-2 border border-gray-100"
        >
          <div className="h-5 w-5 flex relative flex-shrink-0">
            <Image
              layout="fill"
              src={"https://cdn-icons-png.flaticon.com/512/52/52053.png"}
              alt={""}
            />
          </div>
          <p className="text-gray-400 ml-2">Sign in</p>
        </div>
      )}
    </div>
  );
}

export default Header;
