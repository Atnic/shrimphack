import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import qs from "qs";

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const paramAccount = session?.user
    ? qs.stringify({
        filterByFormula: `email="${session?.user?.email}"`,
        maxRecords: 1,
      })
    : "";

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(
    paramAccount
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?${paramAccount}`
      : null,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  console.log(session?.user?.email, account);

  return (
    <div className="flex flex-row w-full justify-between fixed px-8 md:px-16 py-4 bg-slate-900 bg-opacity-80 z-10 items-center">
      <Link href="/">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} />
        </div>
      </Link>
      <div className="hidden md:flex flex-row gap-4 items-center text-lg">
        <div className="hover:-translate-y-1 delay-75">
          <a href="#about">About</a>
        </div>
        <div className="hover:-translate-y-1 delay-75">
          <a href="#tracks">Tracks</a>
        </div>
        <div className="hover:-translate-y-1 delay-75">
          <a href="#prizes">Prizes</a>
        </div>
        <div className="hover:-translate-y-1 delay-75">
          <a href="#projects">Past Projects</a>
        </div>
        <div className="hover:-translate-y-1 delay-75">
          <a href="#testimonies">Testimonies</a>
        </div>
        <div>
          {session ? (
            account?.records ? (
              <button
                className="px-4 py-1 border-white border-2 text-white rounded-xl hover:-translate-y-1 delay-75"
                onClick={() => router.push("/2023")}
              >
                Login
              </button>
            ) : (
              <Link href="/register" className="hover:-translate-y-1 delay-75">
                Register
              </Link>
            )
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/2023" })}
              className="hover:-translate-y-1 delay-75"
            >
              Register
            </button>
          )}
        </div>
      </div>
      <div>
        {session ? (
          account?.records ? (
            <button
              className="px-4 py-2 border-white border-2 text-white rounded-xl hover:-translate-y-1 delay-75"
              onClick={() => router.push("/2023")}
            >
              Login
            </button>
          ) : (
            <Link href="/register" className="hover:-translate-y-1 delay-75">
              Register
            </Link>
          )
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/2023" })}
            className="hover:-translate-y-1 delay-75"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}
