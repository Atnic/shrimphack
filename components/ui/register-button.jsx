import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import qs from "qs";
import { fetcher } from "@/utils/fetcher";

export default function RegisterButton() {
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
  // console.log(account, paramAccount, session?.user, accountDataError);
  //   console.log(session);
  if (session && account?.records[0]) {
    return (
      <button
        className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold w-full md:w-fit"
        onClick={() => router.push("/2023")}
      >
        Your Profile
      </button>
    );
  }
  if (session) {
    return (
      <Link href="/register">
        <div className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold w-full md:w-fit text-center">
          Complete Registration
        </div>
      </Link>
    );
  }
  return (
    <button
      className="px-4 py-2 bg-white text-slate-800 rounded-xl text-lg border-2 hover:border-2 hover:border-white hover:text-white hover:bg-transparent w-full md:w-fit"
      onClick={() => signIn("google", { callbackUrl: "/2023" })}
    >
      Register with JALA&apos;s email
    </button>
  );
}
