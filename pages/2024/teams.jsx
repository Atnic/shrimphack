import React, { useEffect, useState } from "react";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import Image from "next/image";
import useSWR from "swr";
import { SHWhite } from "@/components/logo/shlogo";
import { fetcher } from "@/utils/fetcher";
import { NextSeo } from "next-seo";
import {
  CommandLineIcon,
  SparklesIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Teams() {
  const {
    data: teams,
    error: teamsDataError,
    isLoading: teamsDataLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_AIRTABLE_URI}/teams_2024`, (url) =>
    fetcher(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
  );
  // console.log(teams);

  const filteredTeams = {
    teams: teams?.records?.map((item) => {
      const members = [];
      if (item.fields.members) {
        for (let i = 0; i < item.fields.members.length; i++) {
          const member = {
            name: item.fields.members[i],
            role: item.fields.role[i],
            image_url: item.fields.image_url[i],
            nickname: item.fields.nickname[i],
            // image: item.fields.image ? item.fields.image[i] : undefined,
          };
          members.push(member);
        }
      }

      return {
        name: item.fields.name,
        members: members,
      };
    }),
  };

  // console.log("team baru", filteredTeams);
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <PageLayout>
      <NextSeo
        title="Teams | ShrimpHack 2024 🍤"
        description="ShrimpHack is a competitive weekend-long internal event of JALA
        where Warga JALA come together to work on cool projects. Join on 19 - 20 October, 2024."
        canonical="https://www.shrimphack.com"
        openGraph={{
          url: "https://www.shrimphack.com",
          title: "Teams | ShrimpHack 2024 🍤",
          description:
            "ShrimpHack is a competitive weekend-long internal event of JALA where WargaJALA come together to work on cool projects. Join on 14 - 15 October, 2023.",
          images: [
            {
              url: "https://www.shrimphack.com/shrimphack-800.jpg",
              width: 800,
              height: 450,
              alt: "ShrimpHack 2024",
              type: "image/jpeg",
            },
          ],
          siteName: "ShrimpHack 2024 🍤",
        }}
        twitter={{
          handle: "@jalaindonesia",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <PageContent>
        <Container>
          <div className="flex flex-col py-4">
            <div className="flex flex-col items-center">
              <SHWhite width={300} height={150} fill={"black"} />
            </div>
            <div className="text-4xl font-bold text-center">2024 Teams</div>
            <div className="flex flex-wrap p-4 gap-4 mx-auto">
              {filteredTeams?.teams ? (
                filteredTeams.teams.map((team, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 mx-auto items-center h-fit max-w-sm md:p-4"
                  >
                    <div className="text-3xl font-semibold">{team.name}</div>
                    <div className="flex flex-row flex-wrap items-center justify-center gap-1 md:gap-5 ">
                      {team.members ? (
                        team.members.map((member, i) => (
                          <div
                            key={i}
                            style={{
                              zIndex: i,
                              transform: `rotate(${getRandomArbitrary(
                                -3,
                                3
                              )}deg)`,
                            }}
                            className="relative bg-white p-1 pt-2 md:p-2 md:pt-3 w-16 md:w-24 flex flex-col gap-1 justify-center rounded-sm shadow-md"
                          >
                            <div
                              className={
                                "border-slate-900 border w-14 h-12 md:w-20 md:h-20 overflow-hidden relative rounded-lg"
                              }
                            >
                              <Image
                                src={
                                  member.image
                                    ? member.image?.url
                                    : member.image_url || "/shlogo.jpg"
                                }
                                layout="fill"
                                objectFit="cover"
                                alt={member.name}
                                className="bg-blue-100"
                              />
                            </div>
                            <div className="text-slate-800 text-sm text-center font-sans font-semibold">
                              {member.nickname}
                            </div>
                            <div className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1">
                              {member.role == "Hacker" ? (
                                <CommandLineIcon className="w-5 h-5  text-blue-300" />
                              ) : member.role == "Hustler" ? (
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
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
}
