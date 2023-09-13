import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import Link from "next/link";

export function NavbarAgenda() {
  return (
    <div className="flex flex-row w-full justify-between fixed px-4 md:px-16 py-4 bg-slate-900 bg-opacity-80 z-10">
      <Link href="/" className="cursor-pointer">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} />
        </div>
      </Link>
      <div className="flex flex-row gap-4 items-center text-lg">
        <div className="hidden md:flex hover:-translate-y-1 delay-75">
          <a href="#ticket">Ticket</a>
        </div>
        <div className="md:hidden hover:-translate-y-1 delay-75">
          <a href="#ticket-2">Ticket</a>
        </div>
        <div className="hover:-translate-y-1 delay-75">
          <a href="#events">Events</a>
        </div>
        {/* <div>
          <a href="#prizes">Agenda</a>
        </div> */}
      </div>
    </div>
  );
}
