import React, { useEffect } from "react";
import Image from "next/image";
import { SHWhite, JalaLogo } from "@/components/logo/shlogo";
import { CommandLineIcon, SparklesIcon } from "@heroicons/react/24/outline";

export function Ticket({ account, session }) {
  useEffect(() => {
    if (account) {
      const ticket = document.getElementById("ticket");
      const { x, y, width, height } = ticket.getBoundingClientRect();
      const centerPoint = { x: x + width / 2, y: y + height / 2 };
      window.addEventListener("mousemove", (e) => {
        const degreeX = (e.clientY - centerPoint.y) * 0.008;
        const degreeY = (e.clientX - centerPoint.x) * -0.008;

        ticket.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
      });
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      const ticket = document.getElementById("ticket-2");
      const { x, y, width, height } = ticket.getBoundingClientRect();
      const centerPoint = { x: x + width / 2, y: y + height / 2 };
      window.addEventListener("mousemove", (e) => {
        const degreeX = (e.clientY - centerPoint.y) * 0.008;
        const degreeY = (e.clientX - centerPoint.x) * -0.008;

        ticket.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
      });
    }
  }, [account]);

  // console.log(account);

  return (
    <div className="flex flex-col mx-auto py-24 gap-5 items-center px-4 md:px-16 ">
      <div
        id="ticket"
        className="scroll-mt-20 hidden relative md:flex flex-row border-2 border-slate-500 rounded-xl bg-gradient-to-br from-[#ededed] to-[#bdbdbd] divide-x divide-dashed divide-slate-900 ticket-visual"
      >
        <div className="relative flex flex-col justify-between h-[20rem] px-10 py-10 overflow-hidden">
          {account?.fields.role == "Techies" ? (
            <CommandLineIcon className="w-60 h-60 absolute right-10 bottom-10 text-slate-700 text-opacity-5" />
          ) : (
            <SparklesIcon className="w-60 h-60 absolute right-10 bottom-10 text-slate-700 text-opacity-5" />
          )}

          <div className="flex flex-row items-center gap-4">
            {account && session?.user && (
              <div className="rounded-full w-20 h-20 overflow-hidden">
                <Image
                  src={account?.fields?.image[0]?.url || session?.user?.image}
                  width={account?.fields?.image?.width || 300}
                  height={account?.fields?.image?.height || 300}
                  alt={"account-profile"}
                  className="rounded-full border-2 border-black "
                />
              </div>
            )}
            <div className="flex flex-col gap-1.5 text-black">
              <div className="text-4xl font-bold ">
                {account?.fields.name || session?.user?.name}
              </div>
              <div className="text-sm font-light">
                /{account?.fields.email || session?.user?.email}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <div>
              <SHWhite width={100} height={50} fill={"#000"} />
            </div>
            <div className="flex flex-col text-black">
              <div className="text-sm font-medium">
                14 - 15 October, 2023 &bull; JALA HQ - Sahid, YK
              </div>
              <div className="text-sm inline-flex">
                Hosted by{" "}
                <span className="ml-2">
                  <JalaLogo width={50} height={20} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6">
          <div className="text-6xl font-extrabold text-black rotate-90">
            {account?.fields.number || "#000"}
          </div>
        </div>
      </div>
      <div
        id="ticket-2"
        className="scroll-mt-20 relative flex md:hidden flex-col border-2 border-slate-500 rounded-xl bg-gradient-to-br from-[#ededed] to-[#bdbdbd] divide-y divide-dashed divide-slate-900 ticket-visual-mobile"
      >
        <div className="relative flex flex-col w-[17rem] justify-between px-6 py-10 pb-12 overflow-hidden">
          <div className="flex flex-row items-center gap-4">
            {account && session?.user && (
              <div className="rounded-full w-14 h-14 overflow-hidden">
                <Image
                  src={account?.fields?.image[0]?.url || session?.user?.image}
                  width={account?.fields?.image?.width || 300}
                  height={account?.fields?.image?.height || 300}
                  alt={"account-profile"}
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col text-black">
              <div className="text-xl font-bold ">
                {account?.fields.name || session?.user?.name}
              </div>
              <div className="text-sm font-light">
                /{account?.fields.email || session?.user?.email}
              </div>
            </div>
          </div>
          <div className="flex justify-center text-center items-center py-10">
            <SHWhite width={180} height={80} fill={"#000"} />
          </div>

          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2 text-black text-center items-center">
              <div>
                <div className="text-sm font-medium">14 - 15 October, 2023</div>
                <div className="text-sm font-medium">JALA HQ - Sahid, YK</div>
              </div>
              <div className="inline-flex items-center text-lg font-semibold">
                Hosted by{" "}
                <span className="ml-2">
                  <JalaLogo width={80} height={30} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-12">
          <div className="text-6xl font-extrabold text-black text-center">
            {account?.fields.number || "#000"}
          </div>
        </div>
      </div>
    </div>
  );
}
