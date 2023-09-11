import React from "react";
import { SHWhite } from "@/components/logo/shlogo";
import Link from "next/link";

export function NavbarAgenda() {
  return (
    <div className="flex flex-row w-full justify-between fixed px-16 py-4 bg-slate-900 bg-opacity-80 z-10">
      <Link href="/" className="cursor-pointer">
        <div className="cursor-pointer">
          <SHWhite width={100} height={50} />
        </div>
      </Link>
      <div className="flex flex-row gap-4 items-center text-lg">
        <div>
          <a href="#about">Ticket</a>
        </div>
        <div>
          <a href="#tracks">Events</a>
        </div>
        <div>
          <a href="#prizes">Agenda</a>
        </div>
      </div>
    </div>
  );
}
