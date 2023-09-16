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

  const techies = registered
    ? registered.records.filter((r) => {
        return r.fields.role == "Techies";
      })
    : null;

  const nontech = registered
    ? registered.records.filter((r) => {
        return r.fields.role == "Non-tech";
      })
    : null;
  // console.log(techies, nontech);
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
    <div className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 md:px-16">
      <div className="text-4xl font-bold mx-auto">Registered Users</div>
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 py-6 gap-10 scroll-mt-10 px-4 lg:px-16"
        id="registered"
      >
        <div className="flex flex-col gap-3 md:text-xl md:font-medium leading-relaxed w-auto items-center">
          <div>Tech</div>
          <div className="text-5xl font-semibold">{techies?.length}</div>
          <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
            {techies ? (
              techies.map((t) => (
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
          <div>Non-tech</div>
          <div className="text-5xl font-semibold">{nontech?.length}</div>
          <div className="flex flex-wrap gap-2 w-[15rem] justify-center">
            {nontech ? (
              nontech.map((t) => (
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
