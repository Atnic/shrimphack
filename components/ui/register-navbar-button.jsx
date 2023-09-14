import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export function RegisterNavbarButton({ session, account, className }) {
  // console.log(session, account);
  const router = useRouter();
  return (
    <div className={className}>
      {session ? (
        account?.records[0] ? (
          <button
            className="px-4 py-2 border-white border-2 text-white rounded-xl hover:-translate-y-1 delay-75 inline-flex items-center gap-2"
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
          <Link href="/register">
            <div className="hover:-translate-y-1 delay-75 px-4 py-2 border-white border-2 rounded-xl cursor-pointer">
              Complete Registration
            </div>
          </Link>
        )
      ) : (
        <button
          onClick={() => signIn("google", { callbackUrl: "/2023" })}
          className="hover:-translate-y-1 delay-75 px-4 py-2 border-white border-2 rounded-lg"
        >
          Register
        </button>
      )}
    </div>
  );
}
