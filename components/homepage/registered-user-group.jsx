import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export function RegisteredUserGroups() {
  const {
    data: registered,
    error: registeredDataError,
    isLoading: registeredDataLoading,
  } = useSWR(`api/registered`, (url) => fetcher(url));

  const hacker = registered
    ? registered.records.filter((r) => {
        return r.fields.role == "Hacker";
      })
    : null;

  const hustler = registered
    ? registered.records.filter((r) => {
        return r.fields.role == "Hustler";
      })
    : null;

  const hipster = registered
    ? registered.records.filter((r) => {
        return r.fields.role == "Hipster";
      })
    : null;
  // console.log(hacker, hustler);
  // console.log(registered);

  if (registeredDataLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 px-4 md:px-14 animate-pulse">
        <div className="mx-auto h-10 w-40 bg-slate-600 rounded"></div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 py-6 gap-10 px-4 lg:px-16">
          <div className="flex flex-col gap-3 items-center ">
            <div className="w-20 h-8 bg-slate-600 rounded"></div>
            <div className="h-10 w-20 bg-slate-600 rounded"></div>
            <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center ">
            <div className="w-20 h-8 bg-slate-600 rounded"></div>
            <div className="h-10 w-20 bg-slate-600 rounded"></div>
            <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
              <div className="bg-slate-600 h-12 w-12 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16">
      <div className="text-4xl font-bold mx-auto">Registered Users</div>
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 py-6 gap-10 scroll-mt-10 px-4 lg:px-16"
        id="registered"
      >
        <div className="flex flex-col gap-3 md:text-xl md:font-medium leading-relaxed w-auto items-center">
          <div>Hacker</div>
          <div className="text-5xl font-semibold">{hacker?.length}</div>
          <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
            {hacker ? (
              hacker.map((t) => (
                <Image
                  key={t.fields.name}
                  src={t.fields.image_url || "/shlogo.jpg"}
                  height={50}
                  width={50}
                  alt={t.fields.name}
                  className="rounded"
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:text-xl md:font-medium leading-relaxed w-auto items-center">
          <div>Hipster</div>
          <div className="text-5xl font-semibold">{hipster?.length}</div>
          <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
            {hipster ? (
              hipster.map((t) => (
                <div
                  key={t.fields.name}
                  className="relative rounded h-12 w-12 overflow-hidden"
                >
                  <Image
                    src={t.fields.image_url || "/shlogo.jpg"}
                    layout="fill"
                    objectFit="cover"
                    alt={t.fields.name}
                    className="rounded"
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:text-xl md:font-medium leading-relaxed w-auto items-center">
          <div>Hustler</div>
          <div className="text-5xl font-semibold">{hustler?.length}</div>
          <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
            {hustler ? (
              hustler.map((t) => (
                <Image
                  key={t.fields.name}
                  src={t.fields.image_url || "/shlogo.jpg"}
                  height={50}
                  width={50}
                  alt={t.fields.name}
                  className="rounded"
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
