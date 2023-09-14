import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import qs from "qs";
import { fetcher } from "@/utils/fetcher";
import { RegisterNavbarButton } from "../ui/register-navbar-button";

export function Navbar() {
  const { data: session } = useSession();

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
  } = useSWR(paramAccount ? `/api/account?${paramAccount}` : null, (url) =>
    fetcher(url)
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
    paramRegistered ? `api/registered?${paramRegistered}` : null,
    (url) => fetcher(url)
  );

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

  return (
    <div className="flex flex-row w-full justify-between fixed px-4 lg:px-16 py-4 bg-slate-900 bg-opacity-80 z-10 items-center">
      <Link href="/">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} />
        </div>
      </Link>
      <>
        {registeredUsers < 40 && (
          <RegisterNavbarButton
            className={"md:hidden"}
            account={account}
            session={session}
          />
        )}

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
          {registeredUsers < 40 && (
            <RegisterNavbarButton
              className={"lg:block"}
              account={account}
              session={session}
            />
          )}

          {/* <div>
              {session ? (
                account?.records[0] ? (
                  <button
                    className="px-4 py-1 border-white border-2 text-white rounded-xl hover:-translate-y-1 delay-75 inline-flex items-center gap-2"
                    onClick={() => router.push("/2023")}
                  >
                    Profile
                    <Image
                      src={
                        account?.records[0]?.fields?.image
                          ? account?.records[0]?.fields?.image[0]?.url
                          : account?.records[0]?.fields?.image_url ||
                            session?.user?.image
                      }
                      width={30}
                      height={30}
                      alt={session?.user?.name}
                      className="rounded-full bg-blue-100"
                    />
                  </button>
                ) : (
                  <Link
                    href="/register"
                    className="hover:-translate-y-1 delay-75"
                  >
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
            </div> */}
        </div>
      </>
    </div>
  );
}
