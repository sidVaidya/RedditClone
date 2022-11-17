import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Avatar({ seed, large }: any) {
  const { data: session } = useSession();

  return (
    <div
      className={`relative  rounded-full
      border-gray-300 bg-white overflow-hidden ${
        large ? "h-20 w-20" : "h-10 w-10"
      }`}
    >
      <img
        // layout="fill"
        src={`https://avatars.dicebear.com/api/micah/${seed || "abcd"}.svg`}
        alt={""}
      />
    </div>
  );
}

export default Avatar;
