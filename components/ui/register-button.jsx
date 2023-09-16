import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";
import { RegisterUsersList } from "../homepage/registered-user-list";
// import Image from "next/image";

export default function RegisterButton() {
  const { data: session, loading, status } = useSession();
  const router = useRouter();

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(session ? `/api/account?` : null, (url) => fetcher(url));

  const {
    data: registered,
    error: registeredDataError,
    isLoading: registeredDataLoading,
  } = useSWR(`api/registered`, (url) => fetcher(url));

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
  if (session && account?.records) {
    return (
      <button
        className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold w-full md:w-fit"
        onClick={() => router.push("/2023")}
      >
        Your Profile
      </button>
    );
  }
  if (session?.user && !account?.records) {
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
        Continue with JALA&apos;s email
      </button>
      <Link href={"/register"}>
        <div className="cursor-pointer font-semibold text-white">
          Don&apos;t have JALA&apos;s email?{" "}
          <span className="text-red-500">Register here!</span>
        </div>
      </Link>
    </div>
  );
}
