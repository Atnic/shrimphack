import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import qs from "qs";
import { fetcher } from "@/utils/fetcher";
import { RegisterUsersList } from "../homepage/registered-user-list";
// import Image from "next/image";

export default function RegisterButton() {
  const { data: session, loading, status } = useSession();
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

  const paramRegistered = qs.stringify({
    fields: ["name", "image", "image_url"],
    sort: [{ field: "autonumber", direction: "desc" }],
  });

  const {
    data: registered,
    error: registeredDataError,
    isLoading: registeredDataLoading,
  } = useSWR(
    paramRegistered
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?${paramRegistered}`
      : null,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  if (accountDataLoading || loading || registeredDataLoading) {
    return (
      <div className="animate-pulse">
        <div className="px-8 py-2  rounded-xl w-full md:w-fit h-10 bg-slate-600"></div>
      </div>
    );
  }
  // console.log(account, paramAccount, session?.user, accountDataError);
  // console.log(session?.user?.image);
  // console.log(registered);
  const registeredUsers = registered?.records.length;
  if (registeredUsers > 40) {
    return (
      <div className="flex flex-col gap-2">
        <RegisterUsersList
          registered={registered}
          registeredUsers={registeredUsers}
        />
        <div className="font-semibold text-lg px-4 py-2 rounded-xl bg-red-500 text-white w-full md:w-fit text-center">
          Registration Closed! 😢
        </div>
      </div>
    );
  }
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
  if (session?.user && !account?.records[0]) {
    return (
      <div className="flex flex-col gap-2">
        <RegisterUsersList
          registered={registered}
          registeredUsers={registeredUsers}
        />
        <Link href="/register">
          <div className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold w-full md:w-fit text-center cursor-pointer">
            Complete Registration
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <RegisterUsersList
        registered={registered}
        registeredUsers={registeredUsers}
      />
      <button
        className="px-4 py-2 bg-white text-slate-800 rounded-xl text-lg border-2 hover:border-2 hover:border-white hover:text-white hover:bg-transparent w-full md:w-fit"
        onClick={() => signIn("google", { callbackUrl: "/2023" })}
      >
        Register with JALA&apos;s email
      </button>
    </div>
  );
}
