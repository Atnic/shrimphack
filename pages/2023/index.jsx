import React, { useEffect } from "react";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import { NavbarAgenda } from "@/components/layouts/navbar-agenda";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { SHWhite, JalaLogo } from "@/components/logo/shlogo";
import { useSession, signIn, signOut } from "next-auth/react";
import qs from "qs";
import { CommandLineIcon, SparklesIcon } from "@heroicons/react/24/outline";
import {
  TimeConverter,
  DateNumericConverter,
  DateMonthShortConverter,
} from "@/utils";

export default function SH2023() {
  const { data: session, status, loading } = useSession();

  const paramAccount = session?.user
    ? qs.stringify({
        filterByFormula: `email="${session?.user?.email}"`,
        maxRecords: 1,
      })
    : "";

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(
    paramAccount
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?${paramAccount}`
      : null,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  const {
    data: events,
    error: eventDataError,
    isLoading: eventDataLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/events?sort%5B0%5D%5Bfield%5D=date`,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

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
    if (
      !session &&
      status == "unauthenticated"
      // ||
      // account?.records?.length == 0
    ) {
      console.log("masuk");
      // router.push("/login");
      signIn();
    }
  }, [account, session, status]);

  // console.log(events);

  return (
    <PageLayout>
      <PageContent>
        <NavbarAgenda />
        <Container>
          {account?.records && session?.user && !loading && (
            <div className="flex flex-col">
              <div className="flex flex-col mx-auto py-24 gap-5 items-center px-16">
                <div
                  id="ticket"
                  className=" flex flex-row border-2 border-slate-500 rounded-xl bg-gradient-to-br from-[#ededed] to-[#bdbdbd] divide-x divide-dashed divide-slate-900 ticket-visual"
                >
                  <div className="relative flex flex-col justify-between h-[20rem] px-10 py-10 overflow-hidden">
                    {account?.records[0]?.fields.role == "Techies" ? (
                      <CommandLineIcon className="w-60 h-60 absolute right-10 bottom-10 text-slate-700 text-opacity-5" />
                    ) : (
                      <SparklesIcon className="w-60 h-60 absolute right-10 bottom-10 text-slate-700 text-opacity-5" />
                    )}

                    <div className="flex flex-row items-center gap-4">
                      {account?.records && session?.user && (
                        <div className="rounded-full w-20 h-20 overflow-hidden border-2 border-black">
                          <Image
                            src={
                              account?.records[0]?.fields?.image?.url ||
                              session?.user?.image
                            }
                            width={
                              account?.records[0]?.fields?.image?.width || 300
                            }
                            height={
                              account?.records[0]?.fields?.image?.height || 300
                            }
                            alt={"account-profile"}
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5 text-black">
                        <div className="text-4xl font-bold ">
                          {account?.records[0]?.fields.name ||
                            session?.user?.name}
                        </div>
                        <div className="text-sm font-light">
                          /
                          {account?.records[0]?.fields.email ||
                            session?.user?.email}
                        </div>
                      </div>
                    </div>

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
                      {account?.records[0]?.fields.number || "#000"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col gap-4 py-20 scroll-mt-10 px-16"
                id="events"
              >
                <div className="text-4xl font-bold mx-auto">Events</div>
                <div className="flex flex-col flex-wrap justify-center gap-1 mx-auto py-6">
                  {events?.records ? (
                    events?.records?.map((event, i) => (
                      <div
                        key={i}
                        className="flex flex-row gap-4 p-4 items-center"
                      >
                        <div className="flex flex-col justify-center text-center p-2 bg-white text-slate-900 w-20 rounded-xl">
                          <div className="text-2xl font-bold">
                            {DateNumericConverter(event.fields.date)}
                          </div>
                          <div className="uppercase">
                            {DateMonthShortConverter(event.fields.date)}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1  w-full">
                          <div className="text-lg font-semibold">
                            {event.fields.name}
                          </div>
                          <div className="text-xs">
                            {TimeConverter(event.fields.date)} &bull;{" "}
                            {event.fields.location}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* <div>Agenda</div> */}
            </div>
          )}
        </Container>
      </PageContent>
    </PageLayout>
  );
}
