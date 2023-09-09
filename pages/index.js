import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "@/components/layouts/container";

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
            <div className="mx-auto grid grid-cols-2 py-20 gap-10 items-center w-3/4">
              <div className="text-lg font-medium leading-relaxed">
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
              <div className="grid grid-cols-3 gap-4 mx-auto text-center">
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
              <div className="flex flex-row gap-4 mx-auto">
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
            <div>Past Projects</div>
            <div>Testimonies</div>
            <div>Galleries</div>
            <div>FAQ</div>
            <div>CTA</div>
          </div>
        </Container>
      </PageContent>
    </PageLayout>
  );
}
