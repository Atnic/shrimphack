import React from "react";
import { MemberCard } from "@/components/homepage/member-card";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export function AwardDisclosureSection({ team, handleConfetti, title }) {
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
              <div className="text-5xl font-semibold">{team?.fields?.name}</div>
              <div className="flex flex-row items-center justify-center gap-2 md:gap-6 md:justify-between ">
                {team?.fields?.members ? (
                  team?.fields?.members.map((member, i) => (
                    <MemberCard memberId={member} key={i} />
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
