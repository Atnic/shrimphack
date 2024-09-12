import React from "react";
import { MemberCard } from "./member-card";
import clsx from "clsx";
import { TeamSubmission } from "../teams/team-submission";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function TeamCard({ team }) {
  // console.log(team);
  return (
    <div className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16 space-y-6">
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        Team
      </div>
      <div className="flex flex-col p-4 items-center gap-4">
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
            {team.fields.project_name ? (
              <div className="flex flex-col gap-4">
                {team.fields.images && (
                  <div className="relative flex flex-col items-center justify-center text-center  border-gray-400 w-full h-[15rem] overflow-hidden">
                    <Image
                      src={team.fields.images[0].url}
                      layout="fill"
                      objectFit="cover"
                      alt="project picture"
                      priority
                    />
                  </div>
                )}
                <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-lg">Project Name</div>
                    <div>{team.fields.project_name}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-lg">Theme</div>
                    <div>{team.fields.theme}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <a
                      href={team.fields.repo_link}
                      className="font-medium text-lg text-red-400 inline-flex items-center gap-2 hover:-translate-y-1 hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repository link{" "}
                      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-lg">Descriptions</div>
                    <div>{team.fields.descriptions}</div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <TeamSubmission team={team} />
          </div>
        ) : (
          <div>
            <div className="font-semibold text-center">
              No team. Please wait for the team drawing on 19 October 2024.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
