import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProfileButton } from "../homepage/profile-button";

export function Navbar() {
  const { data: session } = useSession();

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(session?.user?.email ? `/api/account?` : null, (url) =>
    fetcher(url)
  );

  const {
    data: registered,
    error: registeredDataError,
    isLoading: registeredDataLoading,
  } = useSWR(session ? `api/registered` : null, (url) => fetcher(url));

  const registeredUsers = registered?.records.length;

  if (accountDataLoading || registeredDataLoading) {
    return (
      <div className="flex flex-row w-full justify-between fixed px-4 lg:px-16 py-4 bg-slate-900 bg-opacity-80 z-10 items-center animate-pulse">
        <div className="bg-slate-600 h-12 w-32 rounded-lg"></div>
        <div className="bg-slate-600 h-12 w-52 rounded-lg"></div>
      </div>
    );
  }

  // console.log(session?.user?.email, account);

  // console.log(session?.user?.email, account);

  return (
    <div className="flex flex-row w-full justify-between fixed px-4 lg:px-16 py-4 bg-slate-900 bg-opacity-80 z-10 items-center">
      <Link href="/">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} />
        </div>
      </Link>
      <div className="flex flex-row">
        <div className="md:flex flex-row gap-4 items-center text-lg">
          <div className="hover:-translate-y-1 delay-75 hidden md:block">
            <a href="#about">About</a>
          </div>
          <div className="hover:-translate-y-1 delay-75 hidden md:block">
            <a href="#tracks">Tracks</a>
          </div>
          <div className="hover:-translate-y-1 delay-75 hidden md:block">
            <a href="#prizes">Prizes</a>
          </div>
          <div className="hover:-translate-y-1 delay-75 hidden md:block">
            <a href="#projects">Past Projects</a>
          </div>
          <div className="hover:-translate-y-1 delay-75 hidden lg:flex">
            <a href="#testimonies">Testimonies</a>
          </div>
          {<ProfileButton account={account} session={session} />}
        </div>
      </div>
    </div>
  );
}
