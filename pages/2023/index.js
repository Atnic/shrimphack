import React from "react";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import { NavbarAgenda } from "@/components/layouts/navbar-agenda";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { SHWhite, JalaLogo } from "@/components/logo/shlogo";

export default function SH2023() {
  const {
    data: user,
    error: userDataError,
    isLoading: userDataLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?filterByFormula=email='syauqy@jala.tech'`,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  console.log(user);

  return (
    <PageLayout>
      <PageContent>
        <NavbarAgenda />
        <Container>
          <div className="flex flex-col">
            <div className="flex flex-col mx-auto py-20 gap-5 h-screen items-center px-16">
              <div className="relative flex flex-row border-2 border-slate-600 rounded-xl bg-gradient-to-r from-[#ededed] to-[#bdbdbd] divide-x divide-dashed divide-slate-900 ticket-visual">
                <div className="flex flex-col justify-between h-[20rem] px-10 py-10">
                  <div className="flex flex-row items-center gap-4">
                    {user?.records && (
                      <div className="rounded-full w-20 h-20 overflow-hidden border-2 border-black">
                        <Image
                          src={user?.records[0]?.fields.image[0].url}
                          width={user?.records[0]?.fields.image[0].width}
                          height={user?.records[0]?.fields.image[0].height}
                          alt={"user-profile"}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5 text-black">
                      <div className="text-4xl font-bold ">
                        Syauqy Nurul Aziz
                      </div>
                      <div className="text-sm font-light">
                        /syauqy@jala.tech
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row"></div>
                  <div className="flex flex-row gap-4 items-center">
                    <div>
                      <SHWhite width={100} height={50} fill={"#000"} />
                    </div>
                    <div className="flex flex-col text-black">
                      <div className="text-sm font-medium">
                        22 - 23 October, 2023 &bull; JALA HQ - Sahid, YK
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
                    #001
                  </div>
                </div>
              </div>
            </div>
            <div>Events</div>
            <div>Agenda</div>
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
}
