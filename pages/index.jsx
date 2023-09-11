import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { SHWhite } from "@/components/logo/shlogo";
import { Navbar } from "@/components/layouts/navbar";
import RegisterButton from "@/components/ui/register-button";
import clsx from "clsx";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const prizes = [
  {
    name: "Best Team",
    logo: "✨",
  },
  {
    name: "Best Idea",
    logo: "💡",
  },
  {
    name: "Best Design",
    logo: "🎨",
  },
  {
    name: "3 Best Contributors",
    logo: "👷‍♂️",
  },
  {
    name: "3 Best Newcommers",
    logo: "🐣",
  },
];

export default function Home() {
  const {
    data: repos,
    error: repoDataError,
    isLoading: repoDataLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2022_repositories`,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  const {
    data: galleries,
    error: galleryDataError,
    isLoading: galleryDataLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_AIRTABLE_URI}/galleries`, (url) =>
    fetcher(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      },
    })
  );

  const {
    data: testimonies,
    error: testiDataError,
    isLoading: testiDataLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2022_testimonies`,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  const {
    data: tracks,
    error: tracksDataError,
    isLoading: tracksDataLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/tracks?sort%5B0%5D%5Bfield%5D=sort`,
    (url) =>
      fetcher(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        },
      })
  );

  const headerImage = galleries
    ? galleries.records.find((r) => {
        return r.fields.name == "header";
      })
    : null;

  const aboutImage = galleries
    ? galleries.records.find((r) => {
        return r.fields.name == "about";
      })
    : null;

  if (repoDataLoading || testiDataLoading || galleryDataLoading)
    return <div>loading..</div>;
  // console.log(repos);
  // console.log(testimonies);
  // console.log(galleries);
  // console.log(tracks);
  // console.log(headerImage, aboutImage);
  return (
    <PageLayout>
      <PageContent>
        <Navbar />
        <Container>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 mx-auto py-20 gap-5 h-screen items-center px-16">
              <div className="flex flex-col gap-10">
                <div className="text-xl md:text-6xl font-extrabold">
                  ShrimpHack &apos;23
                </div>
                <div className="flex flex-col text-2xl md:text-3xl">
                  <div className="font-semibold">22 - 23 October</div>
                  <div className="text-xl md:text-2xl">JALA HQ - Sahid</div>
                </div>
                <div>
                  <RegisterButton />
                </div>
              </div>
              <div className="">
                <Image
                  src={headerImage.fields.image[0].url}
                  height={headerImage.fields.image[0].height}
                  width={headerImage.fields.image[0].width}
                  alt={"header shrimphack"}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div
              className="mx-auto grid grid-cols-2 py-20 gap-10 items-center scroll-mt-10 px-16"
              id="about"
            >
              <div className="text-xl font-medium leading-relaxed w-auto">
                ShrimpHack is a competitive weekend-long internal event of JALA
                where WargaJALA come together to work on cool projects.
                You&apos;ll have the freedom to create a product, learn new
                techniques for your future work, or just have fun working on a
                project with friends. ShrimpHack wants to help JALA promote the
                inclusive collaborative work environment and drive the
                innovation culture.
              </div>
              <div className="">
                <Image
                  src={aboutImage.fields.image[0].url}
                  height={aboutImage.fields.image[0].height}
                  width={aboutImage.fields.image[0].width}
                  alt={"header shrimphack"}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div
              className="flex flex-col gap-4 py-20 scroll-mt-10 px-16"
              id="tracks"
            >
              <div className="text-4xl font-bold mx-auto">Tracks</div>
              <div className="grid grid-cols-3 gap-2 mx-auto text-center py-6">
                {tracks?.records ? (
                  tracks?.records?.map((track, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 px-2 py-4 lg:px-4 lg:w-72"
                    >
                      <div className="max-w-[14rem] max-h-[10rem] lg:max-w-[18rem] lg:max-h-[18rem] overflow-hidden rounded-lg ">
                        <Image
                          src={track.fields.image[0].url}
                          alt={track.fields.name}
                          height={track.fields.image[0].height}
                          width={track.fields.image[0].width}
                        />
                      </div>
                      <div className="text-lg font-semibold">
                        {track.fields.name}
                      </div>
                      <div>{track.fields.descriptions}</div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              className="flex flex-col gap-4 py-20 scroll-mt-10 px-16"
              id="prizes"
            >
              <div className="text-4xl font-bold mx-auto">Prizes</div>
              <div className="flex flex-row flex-wrap justify-center gap-2 mx-auto py-6">
                {prizes ? (
                  prizes.map((prize, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 p-4 text-center w-40"
                    >
                      <div className="text-5xl">{prize.logo}</div>
                      <div className="text-lg font-semibold">{prize.name}</div>
                      {/* <div>{track.descriptions}</div> */}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              className="flex flex-col gap-4 py-20 scroll-mt-10"
              id="projects"
            >
              <div className="text-4xl font-bold mx-auto">Past Projects</div>
              <div className="flex flex-wrap gap-4 mx-auto px-16 justify-center">
                {repos?.records[0] ? (
                  repos?.records.map((repo, i) => (
                    <div
                      key={repo.id}
                      className="flex flex-col shrink-0 gap-3 text-center p-4 w-72 border-slate-600 border rounded-lg items-center"
                    >
                      <div className="text-lg font-bold">
                        {repo.fields.project_name}
                      </div>
                      <div className="overflow-hidden max-w-[15rem] max-h-[10rem] rounded-lg ">
                        {repo.fields?.image ? (
                          <Image
                            src={
                              repo.fields?.image
                                ? repo.fields?.image[0]?.url
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII="
                            }
                            alt={repo.fields.project_name}
                            height={
                              repo.fields?.image[0]?.thumbnails?.large.height
                            }
                            width={
                              repo.fields?.image[0]?.thumbnails?.large.width
                            }
                            className=""
                          />
                        ) : (
                          <div className="w-[15rem] h-[10rem] bg-slate-400 text-center font-bold text-slate-500 items-center justify-center flex">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-light min-h-[4rem]">
                        {repo.fields.descriptions}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs font-light">Built by</div>
                        <div className="font-medium">
                          {repo.fields.team_name}
                        </div>
                        <div className="flex mx-auto pt-2 -space-x-2">
                          {repo.fields.members_image ? (
                            repo.fields.members_image.map((member, i) => (
                              <div
                                key={i}
                                className={
                                  "border-slate-900 border-2 rounded-full w-10 h-10 overflow-hidden"
                                }
                                style={{ zIndex: i }}
                              >
                                <Image
                                  src={member.url}
                                  width={300}
                                  height={300}
                                  alt={member.filename}
                                />
                              </div>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="inline-flex gap-2 mx-auto"></div>
                      </div>
                      <div className="font-medium">
                        <a
                          href={repo.fields.github_link}
                          className="inline-flex items-center"
                        >
                          Github Repo
                          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white ml-2" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              className="flex flex-col w-full gap-4 py-20 scroll-mt-10"
              id="testimonies"
            >
              <div className="text-4xl font-bold mx-auto">
                What they say about ShrimpHack
              </div>
              <div className="flex overflow-x-scroll w-full no-scrollbar scroll-pl-4 snap-x gap-4 py-6 px-16">
                {testimonies?.records ? (
                  testimonies?.records?.map((testi, i) => (
                    <div
                      key={i}
                      className="p-6 flex flex-col w-[30rem] shrink-0 gap-4 border border-slate-700 rounded-lg"
                    >
                      <div className="text-sm font-light">
                        {testi.fields.comments}
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="overflow-hidden w-10 h-10 rounded-full ">
                          <Image
                            src={testi.fields.image[0].url}
                            alt={testi.fields.name}
                            height={300}
                            width={300}
                          />
                        </div>
                        <div className="text-base font-medium">
                          {testi.fields.name}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>Galleries</div>
            <div>FAQ</div>
            <div>CTA</div>
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
}
