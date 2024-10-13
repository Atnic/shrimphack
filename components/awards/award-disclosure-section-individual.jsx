import React from "react";
// import { MemberCard } from "@/components/homepage/member-card";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import {
  CommandLineIcon,
  SparklesIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/solid";

export function IndividualAwardDisclosureSection({
  winners,
  handleConfetti,
  title,
}) {
  // console.log(winners);
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            onClick={open ? "" : handleConfetti}
            className="flex items-center w-full justify-between rounded-lg px-4 py-2 text-left text-2xl md:text-4xl font-medium text-white hover:border-white border border-slate-900 hover:bg-white hover:text-slate-900 "
          >
            <span>{title}</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-10 w-10 text-red-500`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          ></Transition>
          <Disclosure.Panel className="md:px-4 py-8 pb-20 text-sm text-white mx-auto">
            <div className="flex flex-col gap-4 items-center h-fit max-w-sm md:p-4">
              {/* <div className="text-5xl font-semibold">{team?.fields?.name}</div> */}
              <div className="flex flex-row items-center justify-center gap-2 md:gap-6 md:justify-between ">
                {winners ? (
                  winners.map((member, i) => (
                    <div
                      key={member.id}
                      className="relative bg-white p-1 pt-2 md:p-2 md:pt-3 w-16 md:w-24 flex flex-col gap-1 justify-center rounded-sm shadow-sm"
                    >
                      <div
                        className={
                          "border-slate-900 border w-14 h-12 md:w-20 md:h-20 overflow-hidden relative"
                        }
                      >
                        <Image
                          unoptimized
                          src={
                            member.fields.image
                              ? member.fields.image[0]?.url
                              : member.fields.image_url || "/shlogo.jpg"
                          }
                          layout="fill"
                          objectFit="cover"
                          alt={member.fields.name}
                          className="bg-blue-100"
                        />
                      </div>
                      <div className="text-slate-800 text-sm text-center font-sans font-semibold">
                        {member.fields.nickname}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1">
                        {member.fields.role == "Hacker" ? (
                          <CommandLineIcon className="w-5 h-5  text-blue-300" />
                        ) : member.fields.role == "Hustler" ? (
                          <SparklesIcon className="w-5 h-5  text-amber-300" />
                        ) : (
                          <PaintBrushIcon className="w-4 h-4  text-red-300" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
