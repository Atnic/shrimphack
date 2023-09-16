import React from "react";
import Link from "next/link";

export function RegisterNavbarButton({ session, account, className }) {
  return (
    <div className={className}>
      {session ? (
        !account?.records ? (
          <Link href="/register">
            <div className="hover:-translate-y-1 delay-75 px-4 py-2 border-white border-2 rounded-xl cursor-pointer">
              Complete Registration
            </div>
          </Link>
        ) : (
          <></>
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
