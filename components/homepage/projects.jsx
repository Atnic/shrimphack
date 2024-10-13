import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { rgbDataURL } from "@/utils/blur-url";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";

export function Projects({ repos }) {
  const options = {
    type: "loop",
    fixedWidth: "18rem",
    padding: "15%",
    perPage: 3,
    perMove: 1,
    arrows: false,
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    pagination: false,
  };

  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
      id="projects"
    >
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        Past Projects
      </div>
      <div className="py-6">
        <Splide options={options}>
          {repos?.records[0] ? (
            repos?.records.map((repo, i) => (
              <SplideSlide
                key={repo.id}
                className="flex flex-col gap-3 text-center p-4 border-slate-200 border rounded-xl items-center"
              >
                <div className="text-lg font-bold">
                  {repo.fields.project_name}
                </div>
                <div className="overflow-hidden max-w-[15rem] min-h-[6rem] max-h-[6rem] rounded-lg ">
                  {repo.fields?.image ? (
                    <Image
                      unoptimized
                      src={
                        repo.fields?.image
                          ? repo.fields?.image[0]?.url
                          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII="
                      }
                      alt={repo.fields.project_name}
                      height={repo.fields?.image[0]?.thumbnails?.large.height}
                      width={repo.fields?.image[0]?.thumbnails?.large.width}
                      blurDataURL={rgbDataURL(243, 249, 252)}
                      placeholder="blur"
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
                      <div className="font-medium">{repo.fields.team_name}</div>
                    </div>
                    <div>
                      <div className="text-xs font-light">Year</div>
                      <div className="font-medium">{repo.fields.year}</div>
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
                              blurDataURL={rgbDataURL(243, 249, 252)}
                              placeholder="blur"
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
                    Repo
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-jala-insight ml-2" />
                  </a>
                </div>
              </SplideSlide>
            ))
          ) : (
            <></>
          )}
        </Splide>
      </div>
    </div>
  );
}
