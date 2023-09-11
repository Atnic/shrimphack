import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import RegisterButton from "../ui/register-button";

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-row w-full justify-between fixed px-16 py-4 bg-slate-900 bg-opacity-80 z-10">
      <Link href="/">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} />
        </div>
      </Link>
      <div className="flex flex-row gap-4 items-center text-lg">
        <div>
          <a href="#about">About</a>
        </div>
        <div>
          <a href="#tracks">Tracks</a>
        </div>
        <div>
          <a href="#prizes">Prizes</a>
        </div>
        <div>
          <a href="#projects">Past Projects</a>
        </div>
        <div>
          <a href="#testimonies">Testimonies</a>
        </div>
        <div>
          {session ? (
            <button
              className="px-4 py-1 border-white border-2 text-white rounded-xl"
              onClick={() => router.push("/2023")}
            >
              Login
            </button>
          ) : (
            <a href="#about">Register</a>
          )}
        </div>
      </div>
    </div>
  );
}
