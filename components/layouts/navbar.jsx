import React from "react";
import { SHWhite } from "@/components/logo/shlogo";

export function Navbar() {
  return (
    <div className="flex flex-row w-full justify-between fixed px-6 py-4 bg-black bg-opacity-80 z-10">
      <div>
        <SHWhite width={100} height={50} />
      </div>
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
          <a href="#about">Register</a>
        </div>
      </div>
    </div>
  );
}
