import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import qs from "qs";

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
  //   console.log(session);
  if (session && account?.records) {
    return (
      <button
        className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold"
        onClick={() => router.push("/2023")}
      >
        Login
      </button>
    );
  }
  if (session) {
    return (
      <a
        className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold"
        href="/register"
      >
        Complete Registration
      </a>
    );
  }
  return (
    <button
      className="px-4 py-2 bg-white text-slate-800 rounded-xl text-lg border-2 hover:border-2 hover:border-white hover:text-white hover:bg-transparent"
      onClick={() => signIn("google", { callbackUrl: "/2023" })}
    >
      Register with JALA&apos;s email
    </button>
  );
}
