import React, { useEffect } from "react";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import { NavbarAgenda } from "@/components/layouts/navbar-agenda";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useSession, signIn } from "next-auth/react";
import { Ticket } from "@/components/layouts/ticket";
import { Footer } from "@/components/layouts/footer";
import { NextSeo } from "next-seo";
import { RegisteredUserGroups } from "@/components/homepage/registered-user-group";
import { LinkIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import {
  TimeConverter,
  DateNumericConverter,
  DateMonthShortConverter,
} from "@/utils";
import clsx from "clsx";
import qs from "qs";
import { TeamCard } from "@/components/homepage/team-card";

export default function SH2023() {
  const { data: session, status, loading } = useSession();

  const today = Date.now();

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(`/api/account`, (url) => fetcher(url));

  const teamsParams = account
    ? qs.stringify({
        filterByFormula: `SEARCH('${account.records[0].fields.name}', ARRAYJOIN(full_name, ";"))`,
      })
    : null;

  // console.log(teamsParams);

  const {
    data: teams,
    error: teamsDataError,
    isLoading: teamsDataLoading,
  } = useSWR(teamsParams ? `/api/teams?${teamsParams}` : null, (url) =>
    fetcher(url)
  );

  // const {
  //   data: teams,
  //   error: teamsDataError,
  //   isLoading: teamsDataLoading,
  // } = useSWR(`/api/teams`, (url) => fetcher(url));

  const {
    data: events,
    error: eventDataError,
    isLoading: eventDataLoading,
  } = useSWR(`/api/events`, (url) => fetcher(url));

  useEffect(() => {
    if (!session && status == "unauthenticated" && !account?.records?.length) {
      signIn();
    }
  }, [account, session, status]);

  // console.log(account?.records?.length);
  console.log(teams, account);

  if (accountDataLoading || eventDataLoading)
    return (
      <PageLayout>
        <PageContent>
          <Container>
            <div className="flex flex-col animate-pulse">
              <div className="flex flex-col mx-auto py-24 gap-5 items-center px-10 md:px-16 ">
                <div className="hidden relative md:flex flex-row bg-slate-600 h-80 w-[40rem] lg:w-[45rem] rounded-xl "></div>
                <div className="relative flex md:hidden flex-col bg-slate-600 rounded-xl h-[35rem] w-72"></div>
              </div>
            </div>
          </Container>
        </PageContent>
      </PageLayout>
    );

  return (
    <PageLayout>
      <NextSeo
        title="ShrimpHack 2023 🍤"
        description="ShrimpHack is a competitive weekend-long internal event of JALA
        where Warga JALA come together to work on cool projects. Join on 14 - 15 October, 2023."
        canonical="https://www.shrimphack.com/"
        openGraph={{
          url: "https://www.shrimphack.com/",
          title: "ShrimpHack 2023 🍤",
          description:
            "ShrimpHack is a competitive weekend-long internal event of JALA where WargaJALA come together to work on cool projects. Join on 14 - 15 October, 2023.",
          images: [
            {
              url: "https://www.shrimphack.com/shrimphack-800.jpg",
              width: 800,
              height: 450,
              alt: "ShrimpHack 2023",
              type: "image/jpeg",
            },
          ],
          siteName: "ShrimpHack 2023 🍤",
        }}
        twitter={{
          handle: "@jalaindonesia",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <PageContent>
        <NavbarAgenda />
        <Container>
          {account?.records[0] && session?.user && !loading && (
            <div className="flex flex-col">
              <Ticket account={account?.records[0]} session={session} />
              <div className="flex flex-col gap-2 mx-auto">
                <div className="flex flex-col p-4 border border-slate-200 rounded-md">
                  <div className="">{teams.records[0].fields.name}</div>
                  <div className="flex flex-row gap-4">
                    {teams.records[0].fields.members ? (
                      teams.records[0].fields.members.map((member, i) => (
                        <TeamCard member={member} key={i} />
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <RegisteredUserGroups />
              <div
                className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 md:px-16"
                id="events"
              >
                <div className="text-4xl font-bold mx-auto">Events</div>
                <div className="flex flex-col flex-wrap justify-center gap-1 mx-auto py-6">
                  {events?.records ? (
                    events?.records?.map((event, i) => (
                      <div
                        key={i}
                        className={clsx(
                          today > Date.parse(event.fields.date)
                            ? "opacity-20"
                            : "opacity-100",
                          "flex flex-row gap-4 p-4 items-center"
                        )}
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
                          <div className="text-xs inline-flex gap-3 items-center">
                            {TimeConverter(event.fields.date)} &bull;{" "}
                            {event.fields.location}
                            {event.fields.link &&
                              today < Date.parse(event.fields.date) && (
                                <a
                                  href={event.fields.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex gap-2 items-center px-3 py-0.5 bg-white text-blue-600 rounded-full"
                                >
                                  <VideoCameraIcon className="w-4 h-4 " />
                                  Link
                                </a>
                              )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
        <Footer />
      </PageContent>
    </PageLayout>
  );
}
