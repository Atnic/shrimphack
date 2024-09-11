import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
// import Link from "next/link";
import Container from "@/components/layouts/container";
import { NextSeo } from "next-seo";
import Image from "next/image";
import "@splidejs/react-splide/css/skyblue";
import { Navbar } from "@/components/layouts/navbar";
import { Hero } from "@/components/homepage/hero";
import { About } from "@/components/homepage/about";
import { Tracks } from "@/components/homepage/tracks";
import { Prizes } from "@/components/homepage/prizes";
import { Projects } from "@/components/homepage/projects";
import { Testimonies } from "@/components/homepage/testimonies";
import { Galleries } from "@/components/homepage/galleries";
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

export default function Home({ seo }) {
  // console.log(image);

  const {
    data: repos,
    error: reposDataError,
    isLoading: reposDataLoading,
  } = useSWR(`/api/home/repositories`, (url) => fetcher(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: galleries,
    error: galleriesDataError,
    isLoading: galleriesDataLoading,
  } = useSWR(`/api/home/galleries`, (url) => fetcher(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: contentImages,
    error: contentImagesDataError,
    isLoading: contentImagesDataLoading,
  } = useSWR(`/api/home/content-images`, (url) => fetcher(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: testimonies,
    error: testimoniesDataError,
    isLoading: testimoniesDataLoading,
  } = useSWR(`/api/home/testimonies`, (url) => fetcher(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: tracks,
    error: tracksDataError,
    isLoading: tracksDataLoading,
  } = useSWR(`/api/home/tracks`, (url) => fetcher(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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

  const prizeImage = contentImages
    ? contentImages.records.find((r) => {
        return r.fields.name == "prize";
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
                <div className="order-first md:order-last py-10 bg-slate-600 lg:w-full h-96 rounded-lg"></div>
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
  // console.log(repos);
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
          handle: "@jalaindonesia",
          site: "@site",
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
            {prizes && <Prizes prizes={prizes} prizeImage={prizeImage} />}
            {repos && <Projects repos={repos} />}
            <Agenda />
            {testimonies && <Testimonies testimonies={testimonies} />}
            {images && <Galleries images={images} />}
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
