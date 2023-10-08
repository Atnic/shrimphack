import React from "react";
import { MemberCard } from "./member-card";
import clsx from "clsx";

export function TeamCard({ team }) {
  console.log(team);
  return (
    <div className="flex flex-col gap-2 mx-auto w-full">
      <div className="flex flex-col p-4 items-center gap-4">
        <div className="font-bold text-4xl">Team</div>
        {team ? (
          <div className="flex flex-col p-3 md:p-5 w-full lg:w-3/4 gap-4 border border-slate-300 rounded-xl ">
            <div className="font-semibold text-3xl">{team.fields.name}</div>
            <div
              className={clsx(
                team.fields.members.length > 4
                  ? "justify-center"
                  : "justify-left",
                "flex flex-row flex-wrap items-center  gap-2 md:gap-4 "
              )}
            >
              {team.fields.members ? (
                team.fields.members.map((member, i) => (
                  <MemberCard memberId={member} key={i} />
                ))
              ) : (
                <></>
              )}
            </div>
            {/* {team.fields.project_name ? (
              <div className="grid grid-cols-2 gap-2">
                <div>Project Name: {team.fields.project_name}</div>
                <div>Year: {team.fields.year}</div>
                <div>Theme: {team.fields.theme}</div>
                <div>Descriptions</div>
                <div>Repository link</div>
              </div>
            ) : (
              <div className="text-center">
                <button className="px-4 py-2 bg-red-500 border-white border-2 text-white rounded-xl inline-flex items-center gap-2">
                  Submit Project
                </button>
              </div>
            )} */}
          </div>
        ) : (
          <div>
            <div className="font-semibold">
              No team. Please wait for the team drawing on 14 October 2023.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
