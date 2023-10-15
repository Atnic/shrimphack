import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Image from "next/image";
import {
  CommandLineIcon,
  SparklesIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/solid";

export function MemberCard({ memberId }) {
  // console.log(memberId);
  // const {
  //   data: memberData,
  //   error: memberDataError,
  //   isLoading: memberDataLoading,
  // } = useSWR(
  //   memberId
  //     ? `${process.env.NEXT_PUBLIC_HOSTNAME}/api/registered?recordId=${memberId}`
  //     : null,
  //   (url) => fetcher(url)
  // );

  const {
    data: memberData,
    error: memberDataError,
    isLoading: memberDataLoading,
  } = useSWR(
    memberId
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration/${memberId}`
      : null,
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
  );

  const member = memberData?.fields;
  // console.log(member);
  if (memberDataLoading) {
    return (
      <div className="w-16 md:w-24 animate-pulse">
        <div className="w-24  bg-slate-600 h-28 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-white p-1 pt-2 md:p-2 md:pt-3 w-16 md:w-24 flex flex-col gap-1 justify-center rounded-sm shadow-sm">
      <div
        className={
          "border-slate-900 border w-14 h-12 md:w-20 md:h-20 overflow-hidden relative"
        }
      >
        <Image
          src={
            member.image
              ? member.image[0]?.url
              : member.image_url || "/shlogo.jpg"
          }
          layout="fill"
          objectFit="cover"
          alt={member.name}
          className="bg-blue-100"
        />
      </div>
      <div className="text-slate-800 text-sm text-center font-sans font-semibold">
        {member.nickname}
      </div>
      <div className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1">
        {member.role == "Hacker" ? (
          <CommandLineIcon className="w-5 h-5  text-blue-300" />
        ) : member.role == "Hustler" ? (
          <SparklesIcon className="w-5 h-5  text-amber-300" />
        ) : (
          <PaintBrushIcon className="w-4 h-4  text-red-300" />
        )}
      </div>
    </div>
  );
}
