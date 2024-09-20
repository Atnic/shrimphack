import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";
import { RegisterUsersList } from "../homepage/registered-user-list";
// import Image from "next/image";

export function RegisterButton() {
  const { data: session, loading, status } = useSession();
  const router = useRouter();

  const today = Date.now();
  const registrationClosedDate = Date.parse("7 Oct 2024 00:00:00 GMT");

  // console.log(today > registrationClosedDate);

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
  if (today > registrationClosedDate) {
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
      <div className="flex flex-col gap-2">
        <RegisterUsersList
          registered={registered}
          registeredUsers={registeredUsers}
        />
        <button
          className="px-8 py-2 border-jala-insight border-2 text-jala-insight hover:bg-jala-insight hover:text-white rounded-xl text-lg font-semibold w-full md:w-fit"
          onClick={() => router.push("/2024")}
        >
          Your Profile
        </button>
      </div>
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
          <div className="px-8 py-2 border-jala-insight hover:bg-jala-insight hover:text-white border-2 text-jala-insight rounded-xl text-lg font-semibold w-full md:w-fit text-center cursor-pointer">
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
        className="px-4 py-2 hover:bg-white bg-jala-insight text-white rounded-xl text-lg border-2 border-jala-insight hover:border-2 hover:border-jala-insight hover:text-jala-insight hover:bg-transparent w-full md:w-fit"
        onClick={() => signIn("google", { callbackUrl: "/2024" })}
      >
        Continue with JALA&apos;s email
      </button>
      <Link href={"/register"}>
        <div className="cursor-pointer font-semibold text-slate-700">
          Don&apos;t have JALA&apos;s email?{" "}
          <span className="text-jala-insight hover:underline">
            Register here!
          </span>
        </div>
      </Link>
    </div>
  );
}
