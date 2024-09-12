import React from "react";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blur-url";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";

export function Testimonies({ testimonies }) {
  const options = {
    type: "loop",
    fixedWidth: "23rem",
    perPage: 2,
    perMove: 1,
    arrows: false,
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
    pagination: false,
  };

  //   console.log(testimonies);
  return (
    <div
      className="flex flex-col w-full gap-4 py-20 scroll-mt-10 px-4 lg:px-16"
      id="testimonies"
    >
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        What they say about ShrimpHack
      </div>
      <div className="py-6">
        <Splide options={options}>
          {testimonies?.records ? (
            testimonies?.records?.map((testi, i) => (
              <SplideSlide key={i}>
                <div className="p-6 flex flex-col gap-4 border border-slate-200 rounded-lg justify-between min-h-[21rem]">
                  <div className="text-sm text-left font-light">
                    {testi.fields.comments}
                  </div>
                  <div className="flex justify-start gap-3 items-center">
                    <div className="overflow-hidden w-12 h-12 rounded-full">
                      <Image
                        src={
                          testi.fields?.image?.[0]?.url ||
                          testi?.fields?.image_url[0] ||
                          "/shlogo.jpg"
                        }
                        alt={testi.fields.name}
                        height={300}
                        width={300}
                        className="rounded-full"
                        blurDataURL={rgbDataURL(243, 249, 252)}
                        placeholder="blur"
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
  );
}
