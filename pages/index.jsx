import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
// import Link from "next/link";
import Container from "@/components/layouts/container";
import { NextSeo } from "next-seo";
import Image from "next/image";
import "@splidejs/react-splide/css/skyblue";
import { Navbar } from "@/components/layouts/navbar";
import RegisterButton from "@/components/ui/register-button";
import { Hero } from "@/components/homepage/hero";
import { About } from "@/components/homepage/about";
import { Tracks } from "@/components/homepage/tracks";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Agenda } from "@/components/teams/agenda";
import { Footer } from "@/components/layouts/footer";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

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

export default function Home({
  seo,
  // repos,
  // galleries,
  // contentImages,
  // testimonies,
  // tracks,
}) {
  const options = {
    type: "loop",
    arrows: false,
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    pagination: false,
  };

  // console.log(image);

  const {
    data: repos,
    error: reposDataError,
    isLoading: reposDataLoading,
  } = useSWR(`/api/home/repositories`, (url) => fetcher(url));

  const {
    data: galleries,
    error: galleriesDataError,
    isLoading: galleriesDataLoading,
  } = useSWR(`/api/home/galleries`, (url) => fetcher(url));

  const {
    data: contentImages,
    error: contentImagesDataError,
    isLoading: contentImagesDataLoading,
  } = useSWR(`/api/home/content-images`, (url) => fetcher(url));

  const {
    data: testimonies,
    error: testimoniesDataError,
    isLoading: testimoniesDataLoading,
  } = useSWR(`/api/home/testimonies`, (url) => fetcher(url));

  const {
    data: tracks,
    error: tracksDataError,
    isLoading: tracksDataLoading,
  } = useSWR(`/api/home/tracks`, (url) => fetcher(url));

  const headerImage = contentImages
    ? contentImages.records.find((r) => {
        return r.fields.name == "header";
      })
    : null;

  const aboutImage = contentImages
    ? contentImages.records.find((r) => {
        return r.fields.name == "about";
      })
    : null;

  const images = galleries
    ? galleries.records.filter((g) => {
        return g.fields.name == "galleries";
      })
    : null;

  if (!contentImages || !galleries || !testimonies)
    return (
      <PageLayout>
        <PageContent>
          <Container>
            <div className="flex flex-col animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 mx-auto py-20 gap-5 lg:h-screen items-center px-4 lg:px-16">
                <div className="flex flex-col gap-5 lg:gap-10 w-full">
                  <div className="bg-slate-600 h-20 w-80 md:w-96 rounded-lg"></div>
                  <div className="flex flex-col text-2xl lg:text-3xl gap-1 ">
                    <div className="bg-slate-600 h-10 lg:w-52 rounded-lg"></div>
                    <div className="bg-slate-600 h-8 w-40 rounded-lg"></div>
                  </div>
                  <div>
                    <div className="bg-slate-600 h-8 lg:w-40 rounded-lg"></div>
                  </div>
                </div>
                <div className="order-first md:order-last py-10 bg-slate-600 lg:w-[40rem] h-96 rounded-lg"></div>
              </div>
            </div>
          </Container>
        </PageContent>
      </PageLayout>
    );

  if (reposDataError) return <div>Can&apos;t get repositories</div>;
  if (galleriesDataError) return <div>Can&apos;t get galleries</div>;
  if (contentImagesDataError) return <div>Can&apos;t get content images</div>;
  if (testimoniesDataError) return <div>Can&apos;t get testimonies</div>;
  if (tracksDataError) return <div>Can&apos;t get tracks</div>;
  console.log(repos);
  // console.log(testimonies);
  // console.log(galleries);
  // console.log(tracks);
  // console.log(headerImage, aboutImage);

  // console.log(images);
  return (
    <PageLayout>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        openGraph={{
          url: seo.openGraph.url,
          title: seo.openGraph.title,
          description: seo.openGraph.description,
          images: [
            {
              url: seo.openGraph.images[0].url,
              width: 800,
              height: 450,
              alt: "ShrimpHack 2024",
              type: "image/jpeg",
            },
          ],
          siteName: "ShrimpHack 2024 🍤",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <PageContent>
        <Navbar />
        <Container>
          <div className="flex flex-col">
            {headerImage && <Hero headerImage={headerImage} />}
            {aboutImage && <About aboutImage={aboutImage} />}
            {tracks && <Tracks tracks={tracks} />}

            <div
              className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
              id="prizes"
            >
              <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
                Prizes
              </div>
              <div className="flex flex-row flex-wrap justify-center gap-2 mx-auto py-6">
                {prizes ? (
                  prizes.map((prize, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 p-4 text-center w-36 lg:w-40"
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
            <Agenda />
            <div
              className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16 "
              id="projects"
            >
              <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
                Past Projects
              </div>
              <div className="flex flex-wrap gap-4 mx-auto py-6 justify-center">
                {repos?.records[0] ? (
                  repos?.records.map((repo, i) => (
                    <div
                      key={repo.id}
                      className="flex flex-col gap-3 text-center p-4 w-full md:w-72 border-slate-200 border rounded-xl items-center"
                    >
                      <div className="text-lg font-bold">
                        {repo.fields.project_name}
                      </div>
                      <div className="overflow-hidden max-w-[15rem] min-h-[6rem] max-h-[6rem] rounded-lg ">
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
                      <p className="text-sm font-light line-clamp-3 min-h-[4rem]">
                        {repo.fields.descriptions}
                      </p>
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                          <div>
                            <div className="text-xs font-light">Built by</div>
                            <div className="font-medium">
                              {repo.fields.team_name}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-light">Year</div>
                            <div className="font-medium">
                              {repo.fields.year}
                            </div>
                          </div>
                        </div>

                        <div className="flex mx-auto pt-2 -space-x-2">
                          {repo.fields.members_name ? (
                            repo.fields.members_name.map((member, i) => {
                              return (
                                <div
                                  key={i}
                                  className={
                                    "border-jala-insight border-2 rounded-full w-10 h-10 overflow-hidden"
                                  }
                                  style={{ zIndex: i }}
                                >
                                  <Image
                                    src={
                                      repo.fields?.members_image?.[i]?.url ||
                                      repo.fields?.image_url?.[i] ||
                                      "/shlogo.jpg"
                                    }
                                    width={300}
                                    height={300}
                                    alt={member}
                                  />
                                </div>
                              );
                            })
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
                          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-jala-insight ml-2" />
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
              className="flex flex-col w-full gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
              id="testimonies"
            >
              <div className="text-4xl font-bold text-center mx-auto">
                What they say about ShrimpHack
              </div>
              <div className="py-6">
                <Splide options={options}>
                  {testimonies?.records ? (
                    testimonies?.records?.map((testi, i) => (
                      <SplideSlide key={i}>
                        <div className="p-6 flex flex-col gap-4 border border-slate-700 rounded-lg">
                          <div className="text-sm text-center font-light">
                            {testi.fields.comments}
                          </div>
                          <div className="flex justify-center gap-3 items-center">
                            <div className="overflow-hidden w-12 h-12 rounded-full">
                              <Image
                                src={testi.fields.image[0].url}
                                alt={testi.fields.name}
                                height={300}
                                width={300}
                                className="rounded-full"
                              />
                            </div>
                            <div className="text-base font-medium">
                              {testi.fields.name} &bull; {testi.fields.year}
                            </div>
                          </div>
                        </div>
                      </SplideSlide>
                    ))
                  ) : (
                    <></>
                  )}
                </Splide>
              </div>
            </div>
            <div
              className="flex flex-col gap-4 py-20 scroll-mt-10 mx-auto lg:px-16 px-4"
              id="galleries"
            >
              <div className="text-4xl font-bold mx-auto text-center">
                ShrimpHack 2022 Photos
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mx-auto py-6">
                {images ? (
                  images[0].fields.image.map((image, i) => (
                    <div
                      key={i}
                      className="rounded-lg max-w-[45rem] max-h-[9rem] md:max-h-[13rem] lg:max-h-[15rem] xl:max-h-[20rem] overflow-hidden object-cover"
                    >
                      <Image
                        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 object-cover"
                        src={image.url}
                        alt={image.filename}
                        height={image.thumbnails.large.height}
                        width={image.thumbnails.large.width}
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      seo: {
        title: "ShrimpHack 2024 🍤",
        description:
          "ShrimpHack is a competitive weekend-long internal event of JALA where Warga JALA come together to work on cool projects. Join on 19 - 20 October, 2024.",
        canonical: "https://www.shrimphack.com/",
        openGraph: {
          url: "https://www.shrimphack.com/",
          title: "ShrimpHack 2024 🍤",
          description:
            "ShrimpHack is a competitive weekend-long internal event of JALA where WargaJALA come together to work on cool projects. Join on 19 - 20 October, 2024.",
          images: [
            {
              url: "https://www.shrimphack.com/shrimphack-800.jpg",
              width: 800,
              height: 600,
              alt: "ShrimpHack 2024",
              type: "image/jpeg",
            },
          ],
          siteName: "ShrimpHack 2024 🍤",
        },
        twitter: {
          cardType: "summary_large_image",
        },
      },
    },
  };
}
