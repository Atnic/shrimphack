import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "@/components/layouts/container";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const tracks = [
  {
    name: "🦐 Aquaculture and Sustainability",
    descriptions:
      "Any ideas and project that helpful for farmers and shrimp industry.",
    image: "",
  },
  {
    name: "🏢 What’s around the office",
    descriptions:
      "Make our office better place to work, collaborate, and hang out",
    image: "",
  },
  {
    name: "🧠 Anything on your mind",
    descriptions:
      "Hackathon is about having fun! Make any project that will lift your mood and brighten your day",
    image: "",
  },
];

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

  if (repoDataLoading) return <div>loading..</div>;
  // console.log(repos);
  console.log(testimonies);
  return (
    <PageLayout>
      <PageContent>
        <div>Navbar</div>
        <Container>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 mx-auto py-20 gap-10 h-screen items-center">
              <div className="flex flex-col gap-10">
                <div className="text-xl md:text-6xl font-extrabold">
                  ShrimpHack &apos;23
                </div>
                <div className="flex flex-col text-2xl md:text-3xl">
                  <div className="font-semibold">22 - 23 October</div>
                  <div className="text-xl md:text-2xl">JALA HQ - Sahid</div>
                </div>
                <div>
                  <button className="px-4 py-2 bg-white text-slate-800 rounded-lg text-lg">
                    Register with JALA&apos;s email
                  </button>
                </div>
              </div>
              <div>Gambar</div>
            </div>
            <div className="mx-auto grid grid-cols-2 py-20 gap-10 items-center">
              <div className="text-lg font-medium leading-relaxed w-auto">
                ShrimpHack is a competitive weekend-long internal event of JALA
                where WargaJALA come together to work on cool projects.
                You&apos;ll have the freedom to create a product, learn new
                techniques for your future work, or just have fun working on a
                project with friends. ShrimpHack wants to help JALA promote the
                inclusive collaborative work environment and drive the
                innovation culture.
              </div>
              <div>Gambar</div>
            </div>
            <div className="flex flex-col gap-4 py-20">
              <div className="text-4xl font-bold mx-auto">Tracks</div>
              <div className="grid grid-cols-3 gap-4 mx-auto text-center py-6">
                {tracks ? (
                  tracks.map((track, i) => (
                    <div key={i} className="flex flex-col gap-2 p-4 w-80">
                      <div className="text-lg font-semibold">{track.name}</div>
                      <div>{track.descriptions}</div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 py-20">
              <div className="text-4xl font-bold mx-auto">Prizes</div>
              <div className="flex flex-row gap-4 mx-auto py-6">
                {prizes ? (
                  prizes.map((prize, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 p-4 text-center w-52"
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
            <div className="flex flex-col gap-4 py-20">
              <div className="text-4xl font-bold mx-auto">Past Projects</div>
              <div className="grid grid-flow-col gap-4 mx-auto py-6">
                {repos?.records[0] ? (
                  repos?.records.map((repo, i) => (
                    <div
                      key={repo.id}
                      className="flex flex-col gap-3 text-center p-6 w-80 border-slate-600 border rounded-lg"
                    >
                      <div className="text-lg font-bold">
                        {repo.fields.project_name}
                      </div>
                      <div className="overflow-hidden max-w-[20rem] max-h-[10rem] rounded-lg ">
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
                          <div className="w-full h-[10rem] bg-slate-400 text-center font-bold text-slate-500 items-center justify-center flex">
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
                        <div className="flex gap-2 mx-auto pt-2">
                          {repo.fields.members_image ? (
                            repo.fields.members_image.map((member, i) => (
                              <div
                                key={i}
                                className="rounded-full w-7 h-7 overflow-hidden"
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
            <div className="flex flex-col w-full gap-4 py-20">
              <div className="text-4xl font-bold mx-auto">
                What they say about ShrimpHack
              </div>
              <div className="flex overflow-x-scroll w-full no-scrollbar scroll-pl-4 snap-x gap-4 py-6">
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
