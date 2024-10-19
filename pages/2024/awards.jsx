import React, { useState, useEffect } from "react";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import { useSession, signIn } from "next-auth/react";
import { NextSeo } from "next-seo";
import useSWR from "swr";
import { SHWhite } from "@/components/logo/shlogo";
import { useRouter } from "next/router";
import { fetcher } from "@/utils/fetcher";
import { AwardDisclosureSection } from "@/components/awards/award-disclosure-section";
import { IndividualAwardDisclosureSection } from "@/components/awards/award-disclosure-section-individual";

import JSConfetti from "js-confetti";

export default function Awards() {
  const { data: session, status, loading } = useSession();
  const router = useRouter();
  let jsConfetti;

  if (typeof window !== "undefined") {
    // canvas = document.getElementById("confetti-canvas");
    jsConfetti = new JSConfetti();
  }

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(`/api/account`, (url) => fetcher(url));

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

  const {
    data: registered,
    error: registeredDataError,
    isLoading: registeredDataLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2024_registration?`,
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
  );

  const handleConfetti = () => {
    jsConfetti.addConfetti({
      emojis: ["🍤", "🦐"],
    });
  };

  const favorite = teams?.records?.find((t) => {
    return t?.fields?.awards?.includes("Favorite Team");
  });

  const idea = teams?.records?.find((t) => {
    return t?.fields?.awards?.includes("Best Idea");
  });

  const design = teams?.records?.find((t) => {
    return t?.fields?.awards?.includes("Best Design");
  });

  const third = teams?.records?.find((t) => {
    return t?.fields?.awards?.includes("3rd winner");
  });

  const second = teams?.records?.find((t) => {
    return t?.fields?.awards?.includes("2nd winner");
  });

  const first = teams?.records?.find((t) => {
    return t?.fields?.awards?.includes("1st winner");
  });

  const newcomers = registered?.records?.filter((m) => {
    return m?.fields?.awards?.includes("Best Newcomers");
  });

  const contributors = registered?.records?.filter((m) => {
    return m?.fields?.awards?.includes("Best Contributors");
  });

  const panitia = account?.records?.filter((p) => {
    return p?.fields?.email == "syauqy@jala.tech";
  });

  // console.log(registered);
  // console.log("contributors", contributors);
  // console.log("new", newcomers);

  // console.log(teams);
  // console.log(session, account, panitia);
  //   console.log("favor", favorite);
  //   console.log("best", best);
  //   console.log("idea", idea);
  //   console.log("design", design);

  //   jsConfetti.addConfetti();
  return (
    <PageLayout>
      <NextSeo
        title="Awards | ShrimpHack 2024 🍤"
        description="ShrimpHack is a competitive weekend-long internal event of JALA
        where Warga JALA come together to work on cool projects. Join on 19 - 20 October, 2024."
        canonical="https://www.shrimphack.com/2024/awards"
        openGraph={{
          url: "https://www.shrimphack.com/2024/awards",
          title: "Winners | ShrimpHack 2024 🍤",
          description:
            "ShrimpHack is a competitive weekend-long internal event of JALA where WargaJALA come together to work on cool projects. Join on 14 - 15 October, 2023.",
          images: [
            {
              url: "https://www.shrimphack.com/shrimphack-2024.jpg",
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
          <div className="flex flex-col py-4 pb-20">
            <div className="flex flex-row items-center gap-5 justify-center px-4 md:px-16 mx-auto">
              <SHWhite width={200} height={100} fill={"black"} />
            </div>
            <div className="text-4xl font-bold text-center">2024 Winners</div>
            {panitia ? (
              <div className="flex flex-col md:gap-4 py-20 scroll-mt-10 px-4 md:px-16 min-w-full mx-auto">
                <IndividualAwardDisclosureSection
                  winners={newcomers}
                  title={"🐣 Best Newcomers"}
                  handleConfetti={handleConfetti}
                />
                <IndividualAwardDisclosureSection
                  winners={contributors}
                  title={"👷 Best Contributors"}
                  handleConfetti={handleConfetti}
                />
                <AwardDisclosureSection
                  team={favorite}
                  title={"💙 Favorite Team"}
                  handleConfetti={handleConfetti}
                />
                <AwardDisclosureSection
                  team={idea}
                  title={"💡 Best Idea"}
                  handleConfetti={handleConfetti}
                />
                <AwardDisclosureSection
                  team={design}
                  title={"🎨 Best Design"}
                  handleConfetti={handleConfetti}
                />
                <AwardDisclosureSection
                  team={third}
                  title={"🥉 3rd Winner"}
                  handleConfetti={handleConfetti}
                />
                <AwardDisclosureSection
                  team={second}
                  title={"🥈 2nd Winner"}
                  handleConfetti={handleConfetti}
                />
                <AwardDisclosureSection
                  team={first}
                  title={"🥇 1st Winner"}
                  handleConfetti={handleConfetti}
                />
              </div>
            ) : (
              <div className="flex flex-col py-20 px-4 md:px-16 min-w-full mx-auto text-5xl font-bold text-center">
                Rahasia 🤫
              </div>
            )}
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
}
