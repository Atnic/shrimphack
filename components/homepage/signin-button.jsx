import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";

export function SignInButton() {
  const { data: session, loading, status } = useSession();
  const router = useRouter();

  //   console.log(session);
  return (
    <div>
      {session ? (
        <div>
          <button
            className="px-4 py-2 bg-white text-slate-800 rounded-xl text-lg border-2 hover:border-2 hover:border-white hover:text-white hover:bg-transparent w-full md:w-fit"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <button
            className="px-4 py-2 bg-white text-slate-800 rounded-xl text-lg border-2 hover:border-2 hover:border-white hover:text-white hover:bg-transparent w-full md:w-fit"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Google
          </button>
          <button
            className="px-4 py-2 bg-white text-slate-800 rounded-xl text-lg border-2 hover:border-2 hover:border-white hover:text-white hover:bg-transparent w-full md:w-fit"
            onClick={() =>
              signIn("credentials", {
                username: "lukman@jala.tech",
                password: "081575016011",
                redirect: false,
              })
            }
          >
            Credentials
          </button>
        </div>
      )}
    </div>
  );
}
