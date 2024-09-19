import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import { ProfileButton } from "../homepage/profile-button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function NavbarAgenda() {
  const { data: session } = useSession();

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(session?.user?.email ? `/api/account?` : null, (url) =>
    fetcher(url)
  );

  return (
    <div className="flex flex-row w-full justify-between fixed px-4 lg:px-16 py-4 bg-white bg-opacity-80 shadow-md z-20">
      <Link href="/" className="cursor-pointer">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} fill={"black"} />
        </div>
      </Link>
      <div className="flex flex-row gap-4 items-center text-lg">
        <div className="hover:-translate-y-1 delay-75">
          <a href="#events">Events</a>
        </div>
        {<ProfileButton account={account} session={session} />}
      </div>
    </div>
  );
}
