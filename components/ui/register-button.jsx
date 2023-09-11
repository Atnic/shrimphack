import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function RegisterButton() {
  const { data: session } = useSession();
  const router = useRouter();
  //   console.log(session);
  if (session) {
    return (
      <button
        className="px-8 py-2 border-white border-2 text-white rounded-xl text-lg font-semibold"
        onClick={() => router.push("/2023")}
      >
        Login
      </button>
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
